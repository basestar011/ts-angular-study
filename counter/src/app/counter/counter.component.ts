import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  countSubject: Subject<number> = new Subject<number>();
  count: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.countSubject.subscribe(val => {
      this.count += val;
    });
  }

  excute(val : number) {
    this.countSubject.next(val);
  }

  reset() {
    this.count = 0;
  }

}
