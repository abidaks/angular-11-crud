import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';

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
  selector: 'app-classes-edit',
  templateUrl: './classes-edit.component.html',
  styleUrls: ['./classes-edit.component.css']
})
export class ClassesEditComponent implements OnInit {

	constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

	classForm: FormGroup;
	id = 0;
	code = '';
	name = '';
	maximum_students: number = 0;
	status = '';
	description = '';
	isLoadingResults = false;
	submitErrMsg = [];
	submitErr = false;
	clsErrMsg = '';
	clsErr = false;
	CStatus: any =  [{'name': 'opened'}, {'name': 'closed'}];

	matcher = new MyErrorStateMatcher();

	getClass(id: any) {
	  this.api.getClass(id).subscribe(res => {
	  	this.isLoadingResults = false;
	  	if (res['success']){
	      	let data = res['response']['data'];
	      	this.id = data.id;
		    this.classForm.setValue({
		      code: data.code,
		      name: data.name,
		      maximum_students: data.maximum_students,
		      status: data.status,
		      description: data.description
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
		this.getClass(this.route.snapshot.params['id']);
		this.classForm = this.formBuilder.group({
		    'code' : [null, Validators.required],
		    'name' : [null, Validators.required],
		    'maximum_students' : [null, Validators.required],
		    'status' : [null, Validators.required],
		    'description' : [null, Validators.required]
		  });
	}

	onFormSubmit() {
	  this.isLoadingResults = true;
	  this.api.updateClass(this.id, this.classForm.value)
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
	      }
	    );
	}

}
