import {provide} from 'angular2/core';

import {it, inject, beforeEach, beforeEachProviders} from 'angular2/testing';

import {TagsPipe} from './tags.pipe';

describe('TagsPipe', () => {
  beforeEachProviders(() => [
    TagsPipe
  ]);

  let champions = [];
  let champion1 = { name: 'Amumu', tags: ['Tank', 'Mage'] };
  let champion2 = { name: 'Ahri', tags: ['Mage', 'Assassin'] };
  let champion3 = { name: 'Tryndamere', tags: ['Fighter', 'Melee', 'Assassin'], };

  beforeEach(() => {
    champions = [champion1, champion2, champion3];
  });

  it('should not filter on \'null\'', inject([TagsPipe], (pipe) => {
    champions = pipe.transform(champions, null);
    expect(champions.length).toBe(3);
  }));

  it('should not filter on \'true\'', inject([TagsPipe], (pipe) => {
    champions = pipe.transform(champions, true);
    expect(champions.length).toBe(3);
  }));

  it('should not filter on \'\'', inject([TagsPipe], (pipe) => {
    champions = pipe.transform(champions, '');
    expect(champions.length).toBe(3);
  }));

  it('should not filter on invalid champions', inject([TagsPipe], (pipe) => {
    champions = pipe.transform(null, ['Tank']);
    expect(champions).toBe(null);
  }));

  it('should filter by \'Mage\'', inject([TagsPipe], (pipe) => {
    let result = pipe.transform(champions, ['Mage']);
    expect(result.length).toBe(2);
    expect(result).toContain(champion1);
    expect(result).toContain(champion2);
  }));

  it('should filter by \'Mage, Tank\'', inject([TagsPipe], (pipe) => {
    let result = pipe.transform(champions, ['Mage', 'Tank']);
    expect(result).toHaveEqualContent([champion1]);
  }));

  it('should filter by \'Assassin\'', inject([TagsPipe], (pipe) => {
    let result = pipe.transform(champions, ['Assassin']);
    expect(result.length).toBe(2);
    expect(result).toContain(champion2);
    expect(result).toContain(champion3);
  }));

  it('should filter by \'Fighter\'', inject([TagsPipe], (pipe) => {
    let result = pipe.transform(champions, ['Fighter']);
    expect(result).toHaveEqualContent([champion3]);
  }));

  it('should filter by \'Support\'', inject([TagsPipe], (pipe) => {
    champions = pipe.transform(champions, ['Support']);
    expect(champions.length).toBe(0);
  }));
});
