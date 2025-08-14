import { Component, Inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { DatabaseService } from './services/database.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { HttpClient } from '@angular/common/http';
import { SyncService } from './services/sync.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
  standalone: true
})
export class AppComponent {
  constructor(private database: DatabaseService, private sync: SyncService) { 
    this.initApp()
  }
  
  async initApp() {
    await this.database.initializePlugin()
    await this.sync.startListeners(); // opcional si quieres eventos en tiempo real
    await this.sync.sync(); 
    SplashScreen.hide()
  }
}
