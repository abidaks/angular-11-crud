import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';

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
  selector: 'app-classes-add',
  templateUrl: './classes-add.component.html',
  styleUrls: ['./classes-add.component.css']
})
export class ClassesAddComponent implements OnInit {

	constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

	classForm: FormGroup;
	code = '';
	name = '';
	maximum_students: number = 0;
	status = '';
	description = '';
	isLoadingResults = false;
	submitErrMsg = [];
	submitErr = false;
	CStatus: any =  [{'name': 'opened'}, {'name': 'closed'}];

	matcher = new MyErrorStateMatcher();

	onFormSubmit() {
	  this.isLoadingResults = true;
	  this.api.addClass(this.classForm.value)
	    .subscribe(res => {
	    	if (res['success']){
		      	let data = res['response']['data'];
		      	this.router.navigate(['/classes-view', data.id]);
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
		this.classForm = this.formBuilder.group({
		    'code' : [null, Validators.required],
		    'name' : [null, Validators.required],
		    'maximum_students' : [null, Validators.required],
		    'status' : [null, Validators.required],
		    'description' : [null, Validators.required]
		  });
	}

}
