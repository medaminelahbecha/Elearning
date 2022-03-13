import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceTeacherComponent } from './seance-teacher.component';

describe('SeanceTeacherComponent', () => {
  let component: SeanceTeacherComponent;
  let fixture: ComponentFixture<SeanceTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeanceTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeanceTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
