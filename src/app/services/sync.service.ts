import { Injectable } from '@angular/core';
import { DatabaseService } from '../services/database.service'
import { TaskService } from '../services/task.service';
import { NetworkService } from '../services/network.service';
import { firstValueFrom } from 'rxjs';
import { Task } from '../Interfaces/task';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private syncing = false;

  constructor(
    private db: DatabaseService,
    private api: ApiService,
    private net: NetworkService,
  ) { }
  
    async startListeners() {
    // cuando vuelve internet, sincroniza
    this.net.onlineChanges$.subscribe(async (ok) => {
      if (ok) await this.sync();
    });
  }

  async sync() {
    if (this.syncing || !this.net.isOnline()) return;
    this.syncing = true;
    try {
      // 1) Push: envía pendientes
      const pending = await this.db.getPending();
      if (!pending || pending.length === 0) {
        console.log('No hay cambios para sincronizar.');
        return;
      }

      for (const change of pending) {
        // change.type podría ser 'create' o 'update'
        // change.data contiene los datos a enviar
        if (change.type === 'create') {
          await this.api.createRemote(change);
        } else if (change.type === 'update') {
          await this.api.updateRemote(change);
        }

        // 3. Marcar como sincronizado en la base local
        await this.db.markSynced(change.id);
      }
    } finally {
      this.syncing = false;
    }
  }

  private async pushOne(task: Task) {
    if (task.sync_status === 'pending_create') {
      const saved = await firstValueFrom(this.api.saveTask(task));
      saved.task.sync_status = 'synced'
      await this.db.addtask(saved.task);
    } else if (task.sync_status === 'pending_update') {
      const saved = await firstValueFrom(this.api.updateTaskById(task));
      saved.sync_status = 'synced'
      await this.db.updateTaskById(saved);
    } else if (task.sync_status === 'pending_delete') {
      await firstValueFrom(this.api.deleteTask(task.id));
      // tras borrar remoto, marca como synced y (opcional) purga local si deleted=1
      await this.db.markSynced(task.id);
    }
  }
}
