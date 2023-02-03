import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SERVER_URL } from 'src/environments/environment';
import { Ingredient } from '../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  url = `${SERVER_URL}/ingredient`;

  constructor(private httpClient: HttpClient) { }

  getIngredient(): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = `Erro cliente: error: ${error}, error.error: ${error.error}, error.error.message: ${error.error.message}`;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}