import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddialogComponent } from './addialog.component';

describe('DialogComponent', () => {
  let component: AddialogComponent;
  let fixture: ComponentFixture<AddialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
