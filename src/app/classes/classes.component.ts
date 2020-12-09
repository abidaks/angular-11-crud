import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';

import { Classes } from '../classes';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

	constructor(private api: ApiService) { }

	displayedColumns: string[] = ['code', 'name', 'action'];
	data: Classes[] = [];
	isLoadingResults = true;

	ngOnInit() {
	  this.api.getClasses()
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
