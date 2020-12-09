import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';

import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-students-add',
  templateUrl: './students-add.component.html',
  styleUrls: ['./students-add.component.css']
})
export class StudentsAddComponent implements OnInit {

	constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

	studentForm: FormGroup;
	first_name = '';
	last_name = '';
	date_of_birth: Date = null;
	classes_id: number = 0;
	isLoadingResults = false;
	submitErrMsg = [];
	submitErr = false;
	classes: any = [];

	matcher = new MyErrorStateMatcher();

	model: NgbDateStruct;

	onFormSubmit() {
	  this.isLoadingResults = true;
	  this.api.addStudent(this.studentForm.value)
	    .subscribe(res => {
	    	if (res['success']){
		      	let data = res['response']['data'];
		      	this.router.navigate(['/students']);
		    }else{
		    	this.submitErr = true;
		    	this.submitErrMsg = res['response'];
		    	console.log(res);
		    }
	        this.isLoadingResults = false;
	      }, (err: any) => {
	        console.log(err);
	        this.isLoadingResults = false;
	      });
	}

	ngOnInit() {
		this.isLoadingResults = true;
		this.api.getClasses()
		    .subscribe(res => {
		      if (res['success']){
		      	this.classes = res['response']['data'];
		      }
		      console.log(res);
		      this.isLoadingResults = false;
		    }, err => {
		      console.log(err);
		      this.isLoadingResults = false;
		    });
		this.studentForm = this.formBuilder.group({
		    'first_name' : [null, Validators.required],
		    'last_name' : [null, Validators.required],
		    'classes_id' : [null, Validators.required],
		    'date_of_birth' : [null, Validators.required]
		  });
	}

}
