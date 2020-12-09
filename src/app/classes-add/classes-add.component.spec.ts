import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesAddComponent } from './classes-add.component';

describe('ClassesAddComponent', () => {
  let component: ClassesAddComponent;
  let fixture: ComponentFixture<ClassesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
