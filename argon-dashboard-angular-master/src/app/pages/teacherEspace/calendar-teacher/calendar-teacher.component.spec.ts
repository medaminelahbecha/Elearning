import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTeacherComponent } from './calendar-teacher.component';

describe('CalendarTeacherComponent', () => {
  let component: CalendarTeacherComponent;
  let fixture: ComponentFixture<CalendarTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
