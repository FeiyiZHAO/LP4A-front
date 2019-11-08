import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Counter } from './counter';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CounterService {
    public initialValue = [12, 6, 78];


    constructor(private httpClient: HttpClient) { }

    reset() {
        this.initialValue = [0, 0, 0];
    }

   /* increment(position: number): number {
        this.initialValue[position]++;
        return this.initialValue[position];
    }
*/

increment(): Observable<Counter>{
    this.httpClient.patch("https://lp4asgadot.herokuapp.com/counters/73.json",{"value" : 1}).subscribe();
    return this.httpClient.get<Counter>("https://lp4asgadot.herokuapp.com/counters/73.json");
  }

  getCounterValue(id: number): Observable<Counter> {
    return this.httpClient.get<Counter>("https://lp4asgadot.herokuapp.com/counters/73.json")
  }
}
