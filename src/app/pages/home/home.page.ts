import { Component, inject } from '@angular/core';
import { RefresherCustomEvent, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { TasksComponent } from 'src/app/components/tasks/tasks.component';

import { DataService, Task } from '../../services/data.service';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, TasksComponent, IonIcon, RouterLink],
})
export class HomePage {
  private data = inject(DataService);
  constructor() {
    addIcons({addOutline})
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getTasks(): Task[] {
    return this.data.getTasks();
  }
}
