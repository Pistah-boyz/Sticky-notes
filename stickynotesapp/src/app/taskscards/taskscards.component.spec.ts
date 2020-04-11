import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskscardsComponent } from './taskscards.component';

describe('TaskscardsComponent', () => {
  let component: TaskscardsComponent;
  let fixture: ComponentFixture<TaskscardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskscardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskscardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
