import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CounterService } from '../shared/service/counter.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  
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
