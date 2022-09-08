import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import * as _ from 'lodash';
import { Ingredient } from '../models/ingredient';
import { IngredientService } from '../services/ingredient.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})

export class Tab4Page implements OnInit {



  // formGroup = this.fb.group({
  //   ingredients: [[]],
  //   candy: [true],
  //   salty: [true]
  // });

  ngOnInit() {
    this.ingredientService.getIngredient().subscribe((ingredient: Ingredient[]) => {
      this.listIngredients = ingredient;

      this.queryText = '';
    
      this.allIngredients = this.listIngredients;
    });
  }

  
  listIngredients: Ingredient[];
  
  allIngredients: any; 
  queryText: string;

  constructor(
    private router: Router, 
    private ingredientService: IngredientService,
    // private fb: FormBuilder
  ) {
    

  }

  navigateToSelect(){
    console.log();
    this.router.navigate(["home/tab5"])
  }



  filterIngredient(ingredient: any){

    let val = ingredient.target.value;
    if (val && val.trim() != ''){
      this.listIngredients = _.values(this.allIngredients);
      this.listIngredients = this.listIngredients.filter((ingredient) => {
        return (ingredient.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
        
    } else {
      this.listIngredients = this.allIngredients;
    }


  }
  

}
