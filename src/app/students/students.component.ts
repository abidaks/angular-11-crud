import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';

import { Students } from '../students';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
	
	constructor(private api: ApiService) { }

	displayedColumns: string[] = ['first_name', 'last_name', 'action'];
	data: Students[] = [];
	isLoadingResults = true;

	ngOnInit() {
	  this.api.getStudents()
	    .subscribe(res => {
	      if (res['success']){
	      	this.data = res['response']['data'];
	      }
	      console.log(res);
	      this.isLoadingResults = false;
	    }, err => {
	      console.log(err);
	      this.isLoadingResults = false;
	    });
	}

}
