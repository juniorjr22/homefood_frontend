import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
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

  formGroup = new FormGroup({
    ingredients: new FormArray([]),
    candy: new FormControl(true),
    salty: new FormControl(true)
  });

  listIngredients: Ingredient[];
  allIngredients: Ingredient[]; 
  listIngredientsChecked = [];
  queryText: string;
  orderedIngredients;

  get ordersFormArray() {
    return this.formGroup.controls.ingredients as FormArray;
  }

  constructor(
    private router: Router, 
    private ingredientService: IngredientService
  ) {}

  ngOnInit() {
    this.ingredientService.getIngredient().subscribe((ingredient: Ingredient[]) => {
      this.listIngredients = _.values(ingredient);

      this.queryText = '';
    
      this.allIngredients = _.values(this.listIngredients);
      this.orderedIngredients = _.values(this.allIngredients);
      this.orderedIngredients.sort(function(ingredientA, ingredientB) {return ingredientB.id - ingredientA.id});
      for (let i = 0; i <= this.orderedIngredients[0].id; i++) {
        this.ordersFormArray.push(new FormControl(false));
      }
    });
  }

  navigateToSelect(){
    let idsSelected = [];
    for (let i = 0; i <= this.orderedIngredients[0].id; i++) {
      let idIsSelected = this.formGroup.get('ingredients').get(`${i}`).value;
      if (idIsSelected) {
        idsSelected.push(i);
      }
    }

    this.router.navigate(["home/tab5", {
      ids: idsSelected,
      candy: this.formGroup.get('candy').value,
      salty: this.formGroup.get('salty').value
    }]);
  }

  filterIngredient(ingredient: any){
    let val = ingredient.target.value;
    if (val && val.trim() != ''){
      this.listIngredients = _.values(this.allIngredients);
      this.listIngredients = this.listIngredients.filter((ingredient) => {
        return (ingredient.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.listIngredients = this.allIngredients;
    }
  }

  setCheckedIngredients() {
    setTimeout(()=>{
      this.listIngredients.forEach((ingredient) => {
        let index = this.listIngredientsChecked.lastIndexOf(ingredient.id);
        if (index >= 0) {
          document.getElementById(`ingredient-${ingredient.id}`)['checked'] = true;
        } else {
          document.getElementById(`ingredient-${ingredient.id}`)['checked'] = false;
        }
      });
    }, 1000);
  }
  
}
