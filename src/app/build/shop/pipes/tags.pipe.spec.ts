import {it, inject, beforeEach, beforeEachProviders} from 'angular2/testing';

import {TagsPipe} from './tags.pipe';


describe('Shop TagsPipe', () => {
  beforeEachProviders(() => [
    TagsPipe
  ]);

  let items = [];
  let item1 = {};
  let item2 = {};
  let item3 = {};

  beforeEach(() => {
    item1 = {
      id: 1,
      tags: [
        'CooldownReduction',
        'Health'
      ]
    };
    item2 = {
      id: 2,
      tags: [
        'Armor',
        'Health'
      ]
    };
    item3 = {
      id: 3
    };
    items = [item1, item2, item3];
  });

  it('should filter', inject([TagsPipe], (pipe) => {
    let tags = ['Armor'];
    expect(pipe.transform(items, tags)).toHaveEqualContent([item2]);
  }));

  it('should not filter null', inject([TagsPipe], (pipe) => {
    let tags = ['Armor'];
    expect(pipe.transform(null, tags)).toBe(null);
    expect(pipe.transform(items, null)).toBe(items);
  }));
});
