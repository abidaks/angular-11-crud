import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Classes } from './classes';
import { Students } from './students';
import { Response } from './response';

const httpOptions = {
	  headers: new HttpHeaders({'Content-Type': 'application/json'})
	};
const apiUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	constructor(private http: HttpClient) { };

	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

		  // TODO: send the error to remote logging infrastructure
		  console.error(error); // log to console instead

		  // Let the app keep running by returning an empty result.
		  return of(result as T);
		};
	};

	getClasses (): Observable<Response[]> {
	  let url = apiUrl + '/classes/list';
	  return this.http.get<Response[]>(url)
	    .pipe(
	      tap(heroes => console.log('fetched Classes')),
	      catchError(this.handleError('getProducts', []))
	    );
	};

	getClass(id: any): Observable<Response[]> {
	  let url = apiUrl + '/classes/view/' + id;
	  return this.http.get<Response[]>(url)
	  .pipe(
	    tap(heroes => console.log('fetched class')),
	    catchError(this.handleError('getClass', []))
	  );
	};

	addClass (clas: Classes): Observable<Response[]> {
	  let url = apiUrl + '/classes/add';
	  return this.http.post<Response[]>(url, clas, httpOptions).pipe(
	    tap(heroes => console.log('added class')),
	    catchError(this.handleError('addClass', []))
	  );
	};

	updateClass (id: number, clas: Classes): Observable<Response[]> {
	  let url = apiUrl + '/classes/edit/' + id;
	  return this.http.post<Response[]>(url, clas, httpOptions).pipe(
	    tap(heroes => console.log('updated class')),
	    catchError(this.handleError('updateClass', []))
	  );
	};

	getStudents (): Observable<Response[]> {
	  let url = apiUrl + '/students/list';
	  return this.http.get<Response[]>(url)
	    .pipe(
	      tap(heroes => console.log('fetched students')),
	      catchError(this.handleError('getProducts', []))
	    );
	};

	getStudent(id: any): Observable<Response[]> {
	  let url = apiUrl + '/students/view/' + id;
	  return this.http.get<Response[]>(url)
	  .pipe(
	    tap(heroes => console.log('fetched student')),
	    catchError(this.handleError('getStudent', []))
	  );
	};

	addStudent (student: Students): Observable<Response[]> {
	  let url = apiUrl + '/students/add';
	  return this.http.post<Response[]>(url, student, httpOptions).pipe(
	    tap(heroes => console.log('added student')),
	    catchError(this.handleError('addStudent', []))
	  );
	};

	updateStudent (id: number, student: Students): Observable<Response[]> {
	  let url = apiUrl + '/students/edit/' + id;
	  return this.http.post<Response[]>(url, student, httpOptions).pipe(
	    tap(heroes => console.log('updated student')),
	    catchError(this.handleError('updateClass', []))
	  );
	};
}
