import {Component, Input, Inject, forwardRef, OnInit} from 'angular2/core';
import {NgFor} from 'angular2/common';

import {MasteryComponent} from './mastery.component';
import {MasteryCategoryComponent} from './mastery-category.component';

@Component({
  selector: 'mastery-tier',
  directives: [NgFor, MasteryComponent],
  template: `
    <mastery [data]="mastery" *ngFor="#mastery of data"></mastery>`
})

export class MasteryTierComponent implements OnInit {
  @Input() data: Object;
  @Input() index: number = 0;

  private masteries: Array<MasteryComponent> = new Array<MasteryComponent>();

  constructor( @Inject(forwardRef(() => MasteryCategoryComponent)) private category: MasteryCategoryComponent) {
  }

  public ngOnInit() {
    this.category.addTier(this);
  }

  public addMastery(mastery: MasteryComponent) {
    this.masteries.push(mastery);
    if (this.index === 0) {
      mastery.enable();
    }
  }

  public enable() {
    this.forEachMastery((m) => m.enable());
  }
  public disable() {
    this.forEachMastery((m) => m.disable());
  }

  public lock() {
    this.forEachMastery((m) => m.lock());
  }
  public unlock() {
    this.forEachMastery((m) => m.unlock());
  }

  public setOtherRank(mastery: MasteryComponent, rank: number) {
    for (var index in this.masteries) {
      var m = this.masteries[index];
      if (mastery !== m && m.rank > 0) {
        m.setRank(rank);
        return;
      }
    }
  }
  public getRank(): number {
    var rank = 0;
    this.forEachMastery((m) => rank += m.getRank());
    return rank;
  }

  public rankAdded(mastery: MasteryComponent) {
    this.category.rankAdded(this, mastery);
  }

  public rankRemoved(mastery: MasteryComponent) {
    this.category.rankRemoved(this, mastery);
  }

  private forEachMastery(callback: (MasteryComponent) => void) {
    this.masteries.forEach(function(mastery: MasteryComponent) {
      callback(mastery);
    });
  }
}