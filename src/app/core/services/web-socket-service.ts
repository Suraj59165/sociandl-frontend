import {Injectable} from '@angular/core';
import {Client, StompSubscription} from '@stomp/stompjs';
import {environment} from '../../../environment';
import {Observable} from 'rxjs';
import {PersistentStorageService} from './persistent-storage-service';
import SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient: Client | undefined;
  private readonly socketUrl = environment.apiBaseUrl + 'ws';
  private subscriptions: Map<string, StompSubscription> = new Map();

  constructor() {
  }


  async connect() {
    // Guard: if a client already exists and is connected, return early.
    if (this.stompClient && this.stompClient.connected) {
      console.log('Already connected to the server');
      return;
    }

    const token = PersistentStorageService.getAuthorizationToken();
    if (!token) {
      return;
    }
    const urlWithToken = `${this.socketUrl}?socket-authorization=${encodeURIComponent(token)}`;

    const client = new Client({
      webSocketFactory: () => new SockJS(urlWithToken),
      reconnectDelay: 3000,
      onConnect: () => {
        this.stompClient = client;
        console.log('Connected to the server');
      },
      onStompError: (frame:any) => {
        console.error('Broker error: ' + frame.headers['message']);
      }
    });

    client.activate();
  }


  subscribeTopic(topic: string): Observable<any> {
    return new Observable((observer) => {
      // If already subscribed, do not subscribe again
      if (this.subscriptions.has(topic)) {
        console.log(`Already subscribed to topic: ${topic}`);
      } else {
        const subscription = this.stompClient?.subscribe(topic, (msg:any) => {
          const data = JSON.parse(msg.body);
          observer.next(data);
          console.log(`Received data from topic ${topic}:`, data);
        });

        if (subscription) {
          this.subscriptions.set(topic, subscription);
          console.log(`Subscribed to topic: ${topic}`);
        }
      }

      return () => {
        // Optional: unsubscribe on destroy
        const sub = this.subscriptions.get(topic);
        sub?.unsubscribe();
        this.subscriptions.delete(topic);
        console.log(`Unsubscribed from topic: ${topic}`);
      };
    });
  }


  send(destination: string, payload: any): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination,
        body: JSON.stringify(payload),
      });
      console.log(`📤 Message sent to ${destination}:`, payload);
    } else {

    }
  }


  unsubscribeAll() {
    this.subscriptions.forEach((sub, topic) => {
      sub.unsubscribe();
      console.log(`Unsubscribed from topic: ${topic}`);
    });
    this.subscriptions.clear();
  }

}
