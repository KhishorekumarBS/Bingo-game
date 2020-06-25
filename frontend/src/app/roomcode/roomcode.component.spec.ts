import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomcodeComponent } from './roomcode.component';

describe('RoomcodeComponent', () => {
  let component: RoomcodeComponent;
  let fixture: ComponentFixture<RoomcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
