import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  
  private online$ = new BehaviorSubject<boolean>(false);
  readonly onlineChanges$ = this.online$.asObservable();

    constructor(private http: HttpClient) {
    this.init();
  }

  private async init() {
    const status = await Network.getStatus();
    this.online$.next(status.connected && await this.healthCheck());

    Network.addListener('networkStatusChange', async (s) => {
      const ok = s.connected && await this.healthCheck();
      this.online$.next(ok);
    });

    // revalidación periódica (opcional, por cautela ante portales cautivos)
    // timer(0, 30000).subscribe(async () => {
    //   const cur = await this.healthCheck();
    //   this.online$.next(cur);
    // });
  }

  async healthCheck(): Promise<boolean> {
    try {
      const res = await firstValueFrom(this.http.get('/api/ping', { responseType: 'text' as any }));
      return true;
    } catch {
      return false;
    }
  }

  isOnline(): boolean {
    return this.online$.value;
  }
}
