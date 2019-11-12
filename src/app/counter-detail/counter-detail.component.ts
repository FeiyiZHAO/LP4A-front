import { Component, OnInit } from '@angular/core';
import { Counter } from '../counter';
import { ActivatedRoute } from '@angular/router';
import { CounterService } from '../counter.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-counter-detail',
  templateUrl: './counter-detail.component.html',
  styleUrls: ['./counter-detail.component.css']
})
export class CounterDetailComponent implements OnInit {

  counter: Counter;
  constructor(
    private route : ActivatedRoute,
    private counterService: CounterService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getCounter();
  }

  getCounter() : void{
    this.route.params.subscribe(
      params => {
        this.counterService.getCounterValue(params['id'])
          .subscribe(counter => this.counter = counter);
      }
    );
  }

  increment(){
    this.counterService.increment(this.counter.id)
    .subscribe(counter =>{
    this.counter.value=counter.value;
    });
  }

}
