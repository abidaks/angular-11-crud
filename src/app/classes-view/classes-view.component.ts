import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Classes } from '../classes';

@Component({
  selector: 'app-classes-view',
  templateUrl: './classes-view.component.html',
  styleUrls: ['./classes-view.component.css']
})
export class ClassesViewComponent implements OnInit {

	constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

	cls: Classes = { id: 0, code: '', name: '', maximum_students: 0, status: '', description: null, created_at: null, updated_at: null };
	students = [];
	isLoadingResults = true;

	getClassDetails(id: any) {
	  this.api.getClass(id)
	    .subscribe(res => {
	      if (res['success']){
	      	this.cls = res['response']['data'];
	      	this.students = res['response']['data']['students']
	      }
	      console.log(res);
	      this.isLoadingResults = false;
	    });
	}

	ngOnInit() {
	  this.getClassDetails(this.route.snapshot.params['id']);
	}

}
