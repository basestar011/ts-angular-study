import { Component, Input } from '@angular/core'; // Input 심볼을 로드합니다.

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})

export class ItemDetailComponent {
  @Input() item: string; // 프로퍼티에 @Input() 데코레이터를 지정합니다.
}