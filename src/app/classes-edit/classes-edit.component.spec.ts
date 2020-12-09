import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesEditComponent } from './classes-edit.component';

describe('ClassesEditComponent', () => {
  let component: ClassesEditComponent;
  let fixture: ComponentFixture<ClassesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
