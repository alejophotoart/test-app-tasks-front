import { Component, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonButtons, IonButton, IonIcon, IonAlert, IonToast } from '@ionic/angular/standalone';
import { TasksComponent } from 'src/app/components/tasks/tasks.component';

import { Task } from '../../Interfaces/task';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonToast, IonAlert, IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, TasksComponent, IonIcon, RouterLink],
})
export class HomePage {
  // private data = inject(DataService);
  tasks = this.database.getTasks();
  selectedTask: Task | null = null;
  @ViewChild('tasksList') tasksList!: TasksComponent;
  // Config Toast
  isToastOpen: boolean = false
  messageToast: string = ""
  // Config Alert
  isAlertOpen: boolean = false
  headerAlert: string = ""
  messageAlert: string = ""
  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        this.tasksList.ionList.closeSlidingItems();
      }
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        if (this.selectedTask) {
          this.deleteTask(this.selectedTask);
        }
      },
    },
  ];

  constructor(private database: DatabaseService) {
    console.log(this.tasks);
    addIcons({addOutline});
  }

  async refresh(ev: any) {
    await this.database.loadTasks()
    this.tasks = this.database.getTasks();
  }

  presentDeleteAlert(task: Task) {
    this.selectedTask = task;
    this.headerAlert = "Atencion"
    this.messageAlert = "¿Esta seguro que desea eliminar esta tarea?"
    this.setOpenAlert(true)
  }

  async deleteTask(task: Task) {
    const result = await this.database.deleteTaskById(task.id)
    if (result) {
      this.setOpenAlert(false)
      this.messageToast = "Tarea borrada exitosamente"
      this.setOpenToast(true)
    }
  }

  setOpenAlert(isOpen: boolean) {
    this.isAlertOpen = isOpen
  }

  setOpenToast(isOpen: boolean) {
    this.isToastOpen = isOpen
  }

}
