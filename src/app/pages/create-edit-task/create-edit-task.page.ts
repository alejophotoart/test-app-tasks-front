import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonAlert } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { FormTaskComponent } from 'src/app/components/form-task/form-task.component';
import { Task } from '../../Interfaces/task'
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-create-edit-task',
  templateUrl: './create-edit-task.page.html',
  styleUrls: ['./create-edit-task.page.scss'],
  standalone: true,
  imports: [IonAlert, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FormTaskComponent]
})
export class CreateEditTaskPage implements OnInit {

  public taskId?: string
  private activatedRoute = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  private router = inject(Router);
  public formReceived?: Task
  public task?: Task

  // Config Alert
  isAlertOpen = false;
  headerAlert: string = ""
  subHeaderAlert: string = "" 
  messageAlert: string = ""
  alertButtons = ['Ok'];

  constructor() { 
  }

  async ngOnInit() {
    this.taskId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    if (this.taskId) {
      const result = await this.taskService.getTaskById(parseInt(this.taskId));
      if (result !== false) {
        this.task = result;
      }
    }
  }

  receivedForm(data: Task) {
    this.formReceived = data
  
    if ( !this.taskId ) {
      this.addTask()
    } else {
      this.editTask()
    }
  }

  async addTask() {
    const result = await this.taskService.create(this.formReceived!)
    if (result) {
      this.setAlertMessage("Tarea Guardada", "", "Tarea guardada exitosamente")  
    } else {
      this.setAlertMessage("Ops...", "Error", "Al parecer ocurrio un error intentenlo mas tarde")  
    }
  }

  async editTask() {
    const result = await this.taskService.update(this.formReceived!)
    if (result) {
      this.setAlertMessage("Tarea Actualizada", "", "Tarea actualizada exitosamente")  
    } else {
      this.setAlertMessage("Ops...", "Error", "Al parecer ocurrio un error intentenlo mas tarde")  
    }
  }

  setAlertMessage(header: string, subHeader: string, message: string) {
    this.headerAlert = header
    this.subHeaderAlert = subHeader
    this.messageAlert = message
    this.isAlertOpen = true
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
    this.router.navigate([''])
  }

}
