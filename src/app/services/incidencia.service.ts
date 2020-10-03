import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse  } from '@angular/common/http';
import { IncidenteInterface } from '../models/incidente';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

apiURL = 'http://localhost:3000/incidente/';
 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
   public Incidencias: Observable<IncidenteInterface[]>;
  // public Producto: Observable<ProductoInterface[]>;

constructor(private http: HttpClient) { this.Incidencias=null; }
  
//===================obtener incidencias para un tecnico================
  getIncidencias(): Observable<any> {
	
    return this.Incidencias= this.http.get(this.apiURL).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  //==============obtener una unica incidencia==========================
  getIncidencia(id:string): Observable<any>  {
	
    return this.http.get(this.apiURL + id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  //================agregar incidencia===========================
   agregarIncidencia(incidencia: any): Observable<any> {
    return this.http.post(this.apiURL + 'insertar', incidencia).pipe(
      catchError(this.handleError)
    );
  }
   private extractData(res: Response): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
