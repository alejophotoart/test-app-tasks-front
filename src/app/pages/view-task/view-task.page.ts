import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, Platform, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { TaskComponent } from 'src/app/components/task/task.component';
import { DatabaseService } from 'src/app/services/database.service';
import { Task } from 'src/app/Interfaces/task';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.page.html',
  styleUrls: ['./view-task.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, TaskComponent]
})
export class ViewTaskPage implements OnInit {
  public task?: Task
  private activatedRoute = inject(ActivatedRoute);
  private databaseService = inject(DatabaseService);

  constructor() { }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    const result = await this.databaseService.showTaskById(parseInt(id));
    if (result !== false) {
      this.task = result;
    }
  }

  getBackButtonText() {
    return this.task?.name || 'Atrás';
  }
}
