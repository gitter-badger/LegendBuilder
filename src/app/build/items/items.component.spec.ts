//import {spyOn} from 'jasmine';
import {it, inject, beforeEachProviders, beforeEach} from 'angular2/testing';

import {ItemsComponent} from './items.component';
import {ItemSlotComponent} from './item-slot.component';

// class MockItemSlotComponent implements ItemSlotComponent {

// }

describe('ItemsComponent', () => {
  beforeEachProviders(() => [
    ItemsComponent
  ]);

  // beforeEach(inject([ItemsComponent], (component) => {
  //   component.config = { g: [100, 200, 300], gameTime: 200, sampleSize: 20 };
  //   component.itemSlotComponents = [
  //     {
  //       'id': 3341,
  //       'gold': { 'total': 0 }
  //     },
  //     {
  //       'id': 2003,
  //       'gold': { 'total': 50 }
  //     },
  //     {
  //       'id': 2003,
  //       'gold': { 'total': 50 }
  //     },
  //     {
  //       'id': 2003,
  //       'gold': { 'total': 50 }
  //     }
  //   ];
  // }));

  // it('should add item', inject([ItemsComponent], (component) => {
  //   spyOn(component, 'addTime');
  //   spyOn(component, 'addBundle');
  //   expect(component.addTime).not.toHaveBeenCalled();
  //   expect(component.addBundle).not.toHaveBeenCalled();
  //   component.ngDoCheck();
  //   expect(component.addTime).toHaveBeenCalled();
  //   expect(component.addBundle).toHaveBeenCalled();
  // }));
});
