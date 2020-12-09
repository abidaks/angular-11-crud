import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassesComponent } from './classes/classes.component';
import { ClassesViewComponent } from './classes-view/classes-view.component';
import { ClassesAddComponent } from './classes-add/classes-add.component';
import { ClassesEditComponent } from './classes-edit/classes-edit.component';

import { StudentsComponent } from './students/students.component';
import { StudentsAddComponent } from './students-add/students-add.component';
import { StudentsEditComponent } from './students-edit/students-edit.component';

const routes: Routes = [
  {
    path: 'classes',
    component: ClassesComponent,
    data: { title: 'List of Classes' }
  },
  {
    path: 'classes-view/:id',
    component: ClassesViewComponent,
    data: { title: 'Class Details' }
  },
  {
    path: 'classes-add',
    component: ClassesAddComponent,
    data: { title: 'Add Class' }
  },
  {
    path: 'classes-edit/:id',
    component: ClassesEditComponent,
    data: { title: 'Edit Class' }
  },
  {
    path: 'students',
    component: StudentsComponent,
    data: { title: 'List of Students' }
  },
  {
    path: 'students-add',
    component: StudentsAddComponent,
    data: { title: 'Add Student' }
  },
  {
    path: 'students-edit/:id',
    component: StudentsEditComponent,
    data: { title: 'Edit Student' }
  },
  { path: '',
    redirectTo: '/classes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
