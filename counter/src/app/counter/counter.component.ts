import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  count$: Observable<number>;

  constructor(private counterService: CounterService) {
    this.count$ = this.counterService.getObservableCounter();
  }

  ngOnInit(): void {
  }

  plus() {
    this.counterService.excute(1);
  }

  minus() {
    this.counterService.excute(-1);
  }
  
}
