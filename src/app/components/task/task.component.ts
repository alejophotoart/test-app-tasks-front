import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../Interfaces/task';
import { IonItem, IonLabel, IonNote, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, chevronForward, personCircle } from 'ionicons/icons';
import { RelativeTimePipe } from 'src/app/pipes/relative-time.pipe';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  standalone: true,
  imports: [
    RelativeTimePipe, 
    CommonModule,
    IonNote,
    IonItem,
    IonLabel
  ]
})
export class TaskComponent implements OnInit {
  @Input() task?: Task;
  
  constructor() { 
    addIcons({ personCircle, chevronForward, trashOutline });
  }

  ngOnInit() {
  }

}
