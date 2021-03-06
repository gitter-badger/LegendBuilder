import {Component, Input, Inject, forwardRef, OnInit} from 'angular2/core';
import {NgIf, NgClass} from 'angular2/common';

import {MasteryTierComponent} from './mastery-tier.component';

import {DDragonDirective} from '../../misc/ddragon.directive';

export class Colors {
  public static blue: string = '#4C99FC';
  public static yellow: string = '#fdf300';
  public static gray: string = '#7e7e7e';
}

@Component({
  selector: 'mastery',
  directives: [NgIf, NgClass, DDragonDirective],
  template: `
    <div *ngIf="data" [ngClass]="{enabled: enabled, active: active}" (click)="clicked()" (contextmenu)="rightClicked()" (dragend)="dragEnd()">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" *ngIf="data.ranks > 1" class="rank" width="30" height="16" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient cy="10%" fy="0%" id="radialGradient">
            <stop offset="0%" [attr.stop-color]="color"/>
            <stop offset="100%" stop-color="#000"/>
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="30" height="16"/>
        <rect x="7" y="1" width="16" height="14" opacity="0.7" fill="url(#radialGradient)"/>
        <rect x="1" y="1" width="28" height="14" [attr.stroke]="color" fill="none" stroke-width="1"/>
        <text x="15" y="12" [attr.fill]="color" text-anchor="middle" font-size="12">{{rank + '/' + data.ranks}}</text>
      </svg>
      <img [attr.alt]="data.name" [ddragon]="'mastery/' + data.image.full">
      <div class="description">
        <h2>{{data.name}}</h2>
        <p>{{data.description[0]}}</p>
      </div>
    </div>`
})

export class MasteryComponent implements OnInit {
  @Input() data: Object;

  public rank: number = 0;
  private color: string = Colors.gray;

  private enabled: boolean = false;
  private active: boolean = false;
  private locked: boolean = false;

  constructor( @Inject(forwardRef(() => MasteryTierComponent)) private tier: MasteryTierComponent) {
  }

  public ngOnInit() {
    this.tier.addMasteryComponent(this);
  }

  public enable() {
    if (this.enabled) {
      return;
    }
    if (!this.data) {
      this.disable();
      return;
    }
    this.enabled = true;
    this.changed();
  }

  public disable() {
    if (!this.enabled || this.rank > 0) {
      return;
    }
    this.enabled = false;
    this.changed();
  }

  public lock() {
    this.locked = true;
  }

  public unlock() {
    this.locked = false;
  }

  public getRank() {
    return this.rank;
  }

  public setRank(rank: number) {
    if (!this.enabled) {
      return;
    }
    this.rank = rank;
    this.changed();
  }

  public getMaxRank() {
    if (!this.data || !this.data['ranks']) {
      return 0;
    }
    return this.data['ranks'];
  }

  private clicked() {
    this.addRank();
  }

  private dragEnd() {
    this.addRank();
  }

  private rightClicked() {
    this.removeRank();
    return false; // stop context menu from appearing
  }

  private addRank() {
    if (!this.enabled) {
      return;
    }
    if (this.tier.getRank() === 0) {
      this.rank = this.getMaxRank();
    } else if (this.rank < this.getMaxRank()) {
      this.rank++;
    }
    this.tier.rankAdded(this);
    this.changed();
  }

  private removeRank() {
    if (!this.enabled || this.locked) {
      return;
    }
    if (this.rank > 0) {
      this.rank--;
    }
    this.tier.rankRemoved(this);
    this.changed();
  }

  private changed() {
    if (this.enabled) {
      this.active = this.rank !== 0;
      this.color = this.active ? Colors.yellow : Colors.blue;
    } else {
      this.active = false;
      this.color = Colors.gray;
    }
  }
}
