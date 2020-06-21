import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BingocardComponent } from './bingocard.component';

describe('BingocardComponent', () => {
  let component: BingocardComponent;
  let fixture: ComponentFixture<BingocardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BingocardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BingocardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
