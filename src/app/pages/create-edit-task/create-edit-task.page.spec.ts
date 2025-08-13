import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditTaskPage } from './create-edit-task.page';

describe('CreateEditTaskPage', () => {
  let component: CreateEditTaskPage;
  let fixture: ComponentFixture<CreateEditTaskPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
