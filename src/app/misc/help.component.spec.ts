import {it, inject, beforeEachProviders} from 'angular2/testing';

import {HelpComponent} from './help.component';


describe('ErrorComponent', () => {
  beforeEachProviders(() => [
    HelpComponent
  ]);


  it('should be initialised', inject([HelpComponent], (component) => {
    expect(component.content).not.toBeDefined();
  }));
});
