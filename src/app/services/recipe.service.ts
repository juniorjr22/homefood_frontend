import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Recipe } from '../models/Recipe';
import { RecipeIngredient } from '../models/recipeIngredient';

@Injectable({
    providedIn: 'root'
  })

  export class RecipeService {

    url = 'http://ec2-67-202-10-166.compute-1.amazonaws.com:9000/recipe'; 
    
   // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos as receitas
  
    findByIngredients(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(this.url+'?ids=1&ids=2&ids=3&ids=4&ids=5&ids=6&ids=7')
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


