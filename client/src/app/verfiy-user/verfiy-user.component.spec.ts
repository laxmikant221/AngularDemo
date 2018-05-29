import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfiyUserComponent } from './verfiy-user.component';

describe('VerfiyUserComponent', () => {
  let component: VerfiyUserComponent;
  let fixture: ComponentFixture<VerfiyUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerfiyUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerfiyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
