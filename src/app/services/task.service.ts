import { HttpClient, httpResource } from '@angular/common/http';
import { computed, Inject, Injectable } from '@angular/core';
import { Task } from '../Interfaces/task';
import { DatabaseService } from './database.service';
import { ApiService } from './api.service';
import { NetworkService } from './network.service';
import { firstValueFrom } from 'rxjs';

const API_URL = "http://localhost:8080"

@Injectable({
  providedIn: 'root'
})
  
export class TaskService {

  constructor(
    private db: DatabaseService,
    private api: ApiService,
    private net: NetworkService
  ) {}

  async create(task: Task) {
    
    console.log("fn create online?", this.net.isOnline());
    task.sync_status = this.net.isOnline() ? 'synced' : 'pending_create',
    task.type = 'create'

    // 1) Optimistic local
    await this.db.addtask(task);

    // 2) Si hay internet, intenta remoto y marca synced
    if (this.net.isOnline()) {
      try {
        const taskSaved = await firstValueFrom(this.api.saveTask(task));
        console.log("response mongo", taskSaved);
        taskSaved.task.sync_status = 'synced'
        await this.db.updateTaskById(taskSaved.task);
        return true
      } catch {
        // queda como pending_create para que SyncService lo empuje luego
        return false
      }
    }

    return true
  }

  async getTaskById(id: number) {

    try {
        if (this.net.isOnline()) {
          const task = await firstValueFrom(this.api.getTaskById(id));
          return task
        } else {
          const task = await this.db.showTaskById(id)
          return task
        }
             
      } catch {
      // se queda como pending_update
        return false
      }
  }

  async update(task: Task) {
    const taskUpdated: Task = {
      ...task,
      sync_status: this.net.isOnline() ? 'pending_update' : 'pending_update',
      type: 'update'
    };

    await this.db.updateTaskById(taskUpdated);

    if (this.net.isOnline()) {
      try {
        const taskSaved = await firstValueFrom(this.api.updateTaskById(taskUpdated));
        taskSaved.sync_status = 'synced'
        await this.db.updateTaskById(taskSaved);
      } catch {
        // se queda como pending_update
        return false
      }
    }

    return true
  }

  async remove(id: number) {

    await this.db.deleteTaskById(id);

    if (this.net.isOnline()) {
      try {
        await firstValueFrom(this.api.deleteTask(id));
        // await this.db.markSynced(id);
      } catch {
        // queda como pending_delete
      }
    }
  }
  
  
}
