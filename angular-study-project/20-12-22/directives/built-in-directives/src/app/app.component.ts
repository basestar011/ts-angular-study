import { Component, OnInit } from '@angular/core';
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  canSave =  true;
  isSpecial = true;
  isUnchanged = true;

  isActive = true;
  nullCustomer = null;
  currentCustomer = {
    name: 'Laura'
  };

  item: Item;
  items: Item[];

  currentItem: Item;


  itemsNoTrackByCount   = 0;
  itemsWithTrackByCount = 0;
  itemsWithTrackByCountReset = 0;
  itemIdIncrement = 1;

  currentClasses: {};

  currentStyles: {};

  ngOnInit() {
    this.resetItems();
    this.setCurrentClasses();
    this.setCurrentStyles();
    this.itemsNoTrackByCount = 0;
  }

  setUppercaseName(name: string) {
    this.currentItem.name = name.toUpperCase();
  }

  setCurrentClasses() {
    // CSS 클래스는 컴포넌트 프로퍼티 값에 따라 추가되거나 제거됩니다.
    this.currentClasses =  {
      saveable: this.canSave,
      modified: !this.isUnchanged,
      special:  this.isSpecial
    };
  }

  setCurrentStyles() {
    // CSS 스타일은 컴포넌트 프로퍼티 값에 따라 지정됩니다.
    this.currentStyles = {
      'font-style':  this.canSave      ? 'italic' : 'normal',
      'font-weight': !this.isUnchanged ? 'bold'   : 'normal',
      'font-size':   this.isSpecial    ? '24px'   : '12px'
    };
  }

  isActiveToggle() {
    this.isActive = !this.isActive;
  }

  giveNullCustomerValue() {
    this.nullCustomer = 'Kelly';
  }

  resetItems() {
    this.items = Item.items.map(item => item.clone());
    this.currentItem = this.items[0];
    this.item = this.currentItem;
  }

  resetList() {
    this.resetItems();
    this.itemsWithTrackByCountReset = 0;
    this.itemsNoTrackByCount = ++this.itemsNoTrackByCount;
  }

  changeIds() {

    this.items.forEach(i => i.id += 1 * this.itemIdIncrement);
    this.itemsWithTrackByCountReset = -1;
    this.itemsNoTrackByCount = ++this.itemsNoTrackByCount;
    this.itemsWithTrackByCount = ++this.itemsWithTrackByCount;
  }

  clearTrackByCounts() {
    this.resetItems();
    this.itemsNoTrackByCount = 0;
    this.itemsWithTrackByCount = 0;
    this.itemIdIncrement = 1;
  }
  trackByItems(index: number, item: Item): number { return item.id; }

  trackById(index: number, item: any): number { return item.id; }

}