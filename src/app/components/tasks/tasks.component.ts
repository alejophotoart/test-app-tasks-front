import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { Task } from '../../Interfaces/task';
import { IonItem, IonItemOption, IonItemSliding, IonItemOptions, IonLabel, IonIcon, IonNote, IonList } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, chevronForward, createOutline } from 'ionicons/icons';
import { RouterLink, Router } from '@angular/router';
import { RelativeTimePipe } from '../../pipes/relative-time.pipe';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone: true,
  imports: [IonList, IonNote, IonItem, IonItemOption, IonItemSliding, IonItemOptions, IonLabel, IonIcon, RouterLink, RelativeTimePipe]
})
export class TasksComponent implements OnInit {
  @ViewChild(IonList) ionList!: IonList;
  @Input() tasks?: Task[];
  @Output() deleteTaskEmitter = new EventEmitter<Task>();
  
  constructor(
    private router: Router
  ) { 
    addIcons({chevronForward,trashOutline, createOutline});
  }

  ngOnInit() { }

  editTask(task: Task) {
    this.router.navigate(['create-edit-task', {id: task.id}]);
  }
  
  deleteTaskEmit(task: Task) {
    this.ionList
    this.deleteTaskEmitter.emit(task);
  }

}
