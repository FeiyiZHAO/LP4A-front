import { Component, OnInit, Input } from '@angular/core';
import { CounterService } from '../counter.service';
import { Observable } from 'rxjs';
import { Counter } from '../counter';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

    @Input() id : number;
  name: string;
  value: number;

    constructor(public counterService: CounterService) { }

    ngOnInit() {

    this.counterService.getCounterValue(this.id)
    .subscribe(counter => {
              this.value =  counter.value;
              this.name = counter.name;
              this.id=counter.id;
    });
}

   increment() {
       this.counterService.increment(this.id)
       .subscribe(counter =>{
       this.value=counter.value;
       });
    }


      }
    


