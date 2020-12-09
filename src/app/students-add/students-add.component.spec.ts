import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsAddComponent } from './students-add.component';

describe('StudentsAddComponent', () => {
  let component: StudentsAddComponent;
  let fixture: ComponentFixture<StudentsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
