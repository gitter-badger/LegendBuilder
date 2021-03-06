import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {NgFor, NgIf, NgClass} from 'angular2/common';

import {PreviewComponent} from './preview/preview.component';

import {ItemsComponent} from '../items/items.component';
import {ItemComponent} from './item.component';

import {DDragonDirective} from '../../misc/ddragon.directive';
import {LoadingComponent} from '../../misc/loading.component';
import {ErrorComponent} from '../../misc/error.component';

import {ToIterablePipe} from '../../misc/to-iterable.pipe';
import {CapitalizePipe} from '../../misc/capitalize.pipe';
import {TranslatePipe} from './pipes/translate.pipe';
import {ChampionPipe} from './pipes/champion.pipe';
import {HidePipe} from './pipes/hide.pipe';
import {TagsPipe} from './pipes/tags.pipe';
import {NamePipe} from './pipes/name.pipe';
import {SortPipe} from './pipes/sort.pipe';
import {MapPipe} from './pipes/map.pipe';

import {LolApiService} from '../../misc/lolapi.service';

@Component({
  selector: 'shop',
  providers: [LolApiService, ItemsComponent],
  directives: [NgFor, NgIf, NgClass, PreviewComponent, ItemComponent, DDragonDirective, LoadingComponent, ErrorComponent],
  pipes: [ToIterablePipe, TranslatePipe, CapitalizePipe, MapPipe, ChampionPipe, HidePipe, TagsPipe, NamePipe, SortPipe],
  template: `
    <div class="left">
      <button type="button" name="all-items">All Items</button>
      <div class="category" *ngFor="#category of items?.tree | toIterable">
        <p class="noselect">{{category.header | translate | capitalize}}</p>
        <hr>
        <label *ngFor="#tag of category.tags">
          <input *ngIf="tag != '_SORTINDEX'" type="checkbox" value="{{tag}}" (change)="tagChanged($event)">
          <span *ngIf="tag != '_SORTINDEX'">{{tag | translate | capitalize}}</span>
        </label>
      </div>
    </div>
    <div class="right-container">
      <div class="middle">
        <div class="search">
          <input type="text" name="name" placeholder="Name" (keyup)="name=$event.target.value">
          <button type="button" name="show-disabled" title="Display hidden items">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon eye" width="24" height="24" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 
              3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
          </button>
        </div>
        <div class="items">
          <template ngFor #item [ngForOf]="items?.data | toIterable | map:11 | champion:123 | hide | tags:tags | name:name | sort">
            <item [item]="item" [ngClass]="{disabled: item.disabled}" [attr.title]="item.description" (click)="leftClick(item)"></item>
          </template>
          <loading [loading]="loading"></loading>
          <error [error]="error" (retry)="getData()"></error>
        </div>
      </div>
      <div class="right">
        <preview [item]="pickedItem" [items]="items?.data | toIterable | map:11 | champion:123"></preview>
      </div>
    </div>`
})

export class ShopComponent {
  @Output() itemPicked: EventEmitter<any> = new EventEmitter<any>();

  private items: Object;
  private loading: boolean = true;
  private error: boolean = false;

  private tags: Array<string> = [];
  private pickedItem: Object;

  constructor(private lolApi: LolApiService) {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.error = false;

    this.lolApi.getItems()
      .subscribe(
      res => { this.items = res; },
      error => { this.error = true; this.loading = false; },
      () => this.loading = false
      );
  }

  private tagChanged(event: Event) {
    if (!event || !event.target) {
      return;
    }
    var input = event.target;
    if (input['checked']) {
      this.tags.push(input['value']);
    } else {
      var index: number = this.tags.indexOf(input['value']);
      if (index > -1) {
        this.tags.splice(index, 1);
      }
    }
  }

  private leftClick(pickedItem: Object) {
    this.pickedItem = pickedItem;
    this.itemPicked.next(pickedItem);
    // if (this.MaxOwnableExceeded(this.pickedItems, pickedItem)) {
    //   // replace the first item in the pickedGroup with the new pickedItem
    //   this.pickedItems.forEach((item, index) => {
    //     if (item['group'] === pickedItem['group']) {
    //       this.pickedItems[index] = pickedItem;
    //       return;
    //     }
    //   });
    // } else {
    //   this.pickedItems.push(pickedItem);
    // }
  }

  // private MaxOwnableExceeded(pickedItems: Array<Object>, pickedItem: Object) {
  //   let pickedGroup = pickedItem['group'];
  //   if (!pickedGroup) {
  //     return false;
  //   }

  //   let pickedGroupCount = 0;
  //   this.pickedItems.forEach((item) => {
  //     if (item['group'] === pickedGroup) {
  //       pickedGroupCount++;
  //     }
  //   });

  //   let pickedGroupMaxOwnable = 0;
  //   this.items['groups'].forEach((group) => {
  //     if (pickedGroup.indexOf(group['key']) !== -1) {
  //       pickedGroupMaxOwnable = group['MaxGroupOwnable'];
  //     }
  //   });

  //   if (pickedGroupCount >= pickedGroupMaxOwnable && pickedGroupMaxOwnable >= 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
