import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../services/data.service';
import { IonItem, IonLabel, IonIcon, IonNote } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, chevronForward, personCircle } from 'ionicons/icons';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonNote,
    IonItem,
    IonLabel,
    IonIcon
  ]
})
export class TaskComponent implements OnInit {
  @Input() task?: any;
  
  constructor() { 
    addIcons({ personCircle, chevronForward, trashOutline });
  }

  ngOnInit() {
  }

}
