import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SERVER_URL } from 'src/environments/environment';
import { Recipe } from '../models/Recipe';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  url = `${SERVER_URL}/recipe`;

  constructor(private httpClient: HttpClient) { }
  
  findByIngredients(urlIds): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(this.url + urlIds)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  findLastTen(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(`${this.url}/lastTen`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Erro: ${error}, Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}