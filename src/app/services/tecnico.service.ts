import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse  } from '@angular/common/http';
import { TecnicoInterface } from '../models/tecnico';

import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable()
export class TecnicoService {
apiURL = 'https://projectlab6.herokuapp.com/tecnico';
 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
   public Tecnico: Observable<TecnicoInterface[]>;
 

 private codEquipoMensaje = new BehaviorSubject('');
  codActualEquipo=this.codEquipoMensaje.asObservable();
  codEquipo(message: string) {
    this.codEquipoMensaje.next(message)
  }
private messageSource = new BehaviorSubject('');
   currentMessage = this.messageSource.asObservable();
  
 changeMessage(message: string) {
    this.messageSource.next(message)
  } 
  

constructor(private http: HttpClient) { }
  
getTecnicosAsignados(id:string): Observable<any>  {
	
    return this.http.get('https://jsonplaceholder.typicode.com/todos/').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  //===================================================
   getTecnicos(): Observable<any>  {
  
    return this.http.get(this.apiURL).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
//======================Obtener un solo tecnico===============================
 getTecnico(id:string): Observable<any>  {
  
    return this.http.get(this.apiURL+'/editar/' + id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  //===================agregar tecnico=====================
  agregarTecnico(tecnico: TecnicoInterface): Observable<any> {
    console.log(tecnico+"sss");
    return this.http.post<TecnicoInterface>(this.apiURL+'/insertar', tecnico).pipe(
       catchError(this.handleError)
    );
  }
//===================actualizar tecnico=====================
  actualizarTecnico(idTecnico, tecnico): Observable<any> {
   console.log(this.apiURL+'/editar/'+idTecnico);
    return this.http.put<TecnicoInterface>(this.apiURL+'/editar/'+idTecnico, JSON.stringify(tecnico),this.httpOptions).pipe(

     catchError(this.handleError)
    );
  }
//===================borrar tecnico=====================
  borrarTecnico(id) {
  
    return this.http.delete<TecnicoInterface>(this.apiURL+'/eliminar/'+id).pipe(
      catchError(this.errorHandler)
    )
  }
   private extractData(res: Response): any {
    const body = res;
    return body || { };
  }
errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
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