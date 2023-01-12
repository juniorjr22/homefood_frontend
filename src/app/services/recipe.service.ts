import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Recipe } from '../models/Recipe';
import { RecipeIngredient } from '../models/recipeIngredient';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

  export class RecipeService {

    url = `${SERVER_URL}/recipe`; 
    
   // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos as receitas
  
  findByIngredients(urlIds): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(this.url + urlIds)
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
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

  }


