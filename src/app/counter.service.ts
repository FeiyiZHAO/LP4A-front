import { Injectable, EventEmitter} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Counter } from './counter';
import { Observable, Subscription } from 'rxjs';
import { ActionCableService, Channel } from 'angular2-actioncable';


@Injectable({
  providedIn: 'root'
})



export class CounterService {
  public initialValue = [12, 5, 7];

  subscription: Subscription;

  private counterObservable:Map<number, Observable<Counter>> = new Map();

  private counterUrl = 'https://lp4asgadot.herokuapp.com/counters/';
  private countersUrl = 'https://lp4asgadot.herokuapp.com/counters.json';

  constructor(private http: HttpClient, private cableService: ActionCableService) { 
    // Open a connection and obtain a reference to the channel
    const channel: Channel = this.cableService
    .cable('wss://lp4asgadot.herokuapp.com/cable')
    .channel('CountersChannel', {});
      // Subscribe to incoming messages
      this.subscription = channel.received().subscribe(message => {
        console.log(message, this.counterObservable[message.id]);

        if(this.counterObservable.has(message.id)) {
          console.log("emit");
          this.counterObservable[message.id].emit({id: message.id, name: message.name, value:message.value})
        }
      });
  }
  reset() {
    this.initialValue = [0, 0, 0];
  }

  increment(id: number): Observable<Counter> {
    return this.http.patch<Counter>(this.counterUrl + id + '.json', {});
  }

  getCounterValue(id: number): Observable<Counter> {
    //this.counterObservable.next;
    //return this.http.get<Counter>(this.counterUrl + id + '.json');
    if (! this.counterObservable.has(id)) {
      this.counterObservable[id] = new EventEmitter<Counter>() 
    }
    this.http.get<Counter>(this.counterUrl + id + '.json')
                   .subscribe(counter =>  this.counterObservable[id].emit(counter))
    return this.counterObservable[id]

  }



  getCounters(): Observable<Counter[]> {
    return this.http.get<Counter[]>(this.countersUrl);
  }

  
}

/* increment(position: number): number {
        this.initialValue[position]++;
        return this.initialValue[position];
    }


increment(): Observable<Counter>{
    this.httpClient.patch("https://lp4asgadot.herokuapp.com/counters/73.json",{"value" : 1}).subscribe();
    return this.httpClient.get<Counter>("https://lp4asgadot.herokuapp.com/counters/73.json");
  }

  getCounterValue(id: number): Observable<Counter> {
    return this.httpClient.get<Counter>("https://lp4asgadot.herokuapp.com/counters/73.json")
  }
  */
