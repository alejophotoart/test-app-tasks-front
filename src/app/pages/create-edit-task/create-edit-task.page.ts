import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { FormTaskComponent } from 'src/app/components/form-task/form-task.component';

@Component({
  selector: 'app-create-edit-task',
  templateUrl: './create-edit-task.page.html',
  styleUrls: ['./create-edit-task.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FormTaskComponent]
})
export class CreateEditTaskPage implements OnInit {

  public taskId?: string
  private activatedRoute = inject(ActivatedRoute);

  constructor() { 
  }

  ngOnInit() {
    this.taskId = this.activatedRoute.snapshot.paramMap.get('id') as string;

  }

}
