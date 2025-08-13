import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../services/data.service';
import { IonItem, IonItemOption, IonItemSliding, IonItemOptions, IonLabel, IonIcon, IonNote, IonList } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, chevronForward } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone: true,
  imports: [IonList, IonNote, IonItem, IonItemOption, IonItemSliding, IonItemOptions, IonLabel, IonIcon, RouterLink]
})
export class TasksComponent  implements OnInit {
  @Input() tasks?: Task[];
  constructor() { 
    addIcons({chevronForward,trashOutline});
  }

  ngOnInit() {}

}
