import { HttpClient, httpResource } from '@angular/common/http';
import { computed, Inject, Injectable } from '@angular/core';
import { Task, TaskResponse } from '../Interfaces/task';
import { environment } from 'src/environments/environment.prod';

const api_url = environment.api_url

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private tasks: Task[] = []

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<Task[]>(api_url);
  }

  getTaskById(id: number) {
    return this.http.get<Task>(`${api_url}/${id}`)
  }
  
  saveTask(task: Task) {
    return this.http.post<TaskResponse>(api_url, task)
  }
  
  updateTaskById(task: Task) {
    return this.http.put<Task>(`${api_url}/${task.id}`, task)
  }

  deleteTask(id: number) {
    return this.http.delete(`${api_url}/${id}`)
  }

  async createRemote(data: any) {
    return this.http.post(`${api_url}`, data).toPromise();
  }

  async updateRemote(data: any) {
    return this.http.put(`${api_url}/${data.id}`, data).toPromise();
  }
  
}
