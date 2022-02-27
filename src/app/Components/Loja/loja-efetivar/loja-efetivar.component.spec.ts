/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LojaEfetivarComponent } from './loja-efetivar.component';

describe('LojaEfetivarComponent', () => {
  let component: LojaEfetivarComponent;
  let fixture: ComponentFixture<LojaEfetivarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LojaEfetivarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaEfetivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
