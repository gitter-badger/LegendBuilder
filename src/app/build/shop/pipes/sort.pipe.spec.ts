import {it, inject, beforeEach, beforeEachProviders} from 'angular2/testing';

import {SortPipe} from './sort.pipe';


describe('Shop SortPipe', () => {
  beforeEachProviders(() => [
    SortPipe
  ]);

  let items = [];
  let item1 = {};
  let item2 = {};
  let item3 = {};

  beforeEach(() => {
    item1 = {
      id: 1,
      gold: { total: 3 }
    };
    item2 = {
      id: 2,
      gold: { total: 0 }
    };
    item3 = {
      id: 3,
      gold: { total: 1 }
    };
    items = [item1, item2, item3];
  });

  it('should sort', inject([SortPipe], (pipe) => {
    expect(pipe.transform(items)).toHaveEqualContent([item2, item3, item1]);
  }));

  it('should not sort null', inject([SortPipe], (pipe) => {
    expect(pipe.transform(null)).toBe(null);
  }));
});
