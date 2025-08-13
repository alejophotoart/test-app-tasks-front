import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, Platform, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { DataService, Task } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { TaskComponent } from 'src/app/components/task/task.component';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.page.html',
  styleUrls: ['./view-task.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, TaskComponent]
})
export class ViewTaskPage implements OnInit {
  public task?: Task
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);

  constructor() { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.task = this.data.getTasksById(parseInt(id, 10));

  }

  getBackButtonText() {
    return this.task?.fromName || 'Atrás';
  }
}
