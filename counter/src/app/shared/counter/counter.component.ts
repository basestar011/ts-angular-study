import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CounterService } from '../service/counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {

  count$: Observable<number>;

  constructor(private counterService: CounterService) {
    this.count$ = this.counterService.getObservableCounter();
  }

  plus() {
    this.counterService.excute(1);
  }

  minus() {
    this.counterService.excute(-1);
  }
  
}
