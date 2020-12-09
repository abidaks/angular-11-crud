import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';

import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-students-edit',
  templateUrl: './students-edit.component.html',
  styleUrls: ['./students-edit.component.css']
})
export class StudentsEditComponent implements OnInit {

	constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

	studentForm: FormGroup;
	id = 0;
	first_name = '';
	last_name = '';
	date_of_birth: Date = null;
	classes_id: number = 0;
	isLoadingResults = false;
	submitErrMsg = [];
	submitErr = false;
	clsErrMsg = '';
	clsErr = false;
	classes: any =  [];

	model: NgbDateStruct;

	matcher = new MyErrorStateMatcher();

	getStudent(id: any) {
	  this.api.getStudent(id).subscribe(res => {
	  	this.isLoadingResults = false;
	  	if (res['success']){
	      	let data = res['response']['data'];
	      	this.classes = res['response']['classes'];
	      	this.id = data.id;
		    this.studentForm.setValue({
		      first_name: data.first_name,
		      last_name: data.last_name,
		      classes_id: data.classes_id,
		      date_of_birth: data.date_of_birth
		    });
	    }else{
	    	this.clsErr = true;
	    	this.clsErrMsg = res['response'];
	    	console.log(res);
	    }
	  });
	}

	ngOnInit() {
		this.isLoadingResults = true;
		this.getStudent(this.route.snapshot.params['id']);
		this.studentForm = this.formBuilder.group({
		    'first_name' : [null, Validators.required],
		    'last_name' : [null, Validators.required],
		    'classes_id' : [null, Validators.required],
		    'date_of_birth' : [null, Validators.required]
		  });
	}

	onFormSubmit() {
	  this.isLoadingResults = true;
	  this.api.updateStudent(this.id, this.studentForm.value)
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
	      }
	    );
	}

}
