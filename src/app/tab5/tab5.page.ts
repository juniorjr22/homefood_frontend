import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-tab5', 
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
    
})

export class Tab5Page implements OnInit {

  recipes: Recipe[];
  recipeShow: Recipe;
  ids = [];
  candy = true;
  salty = true;
  isModalOpen = false;

  constructor(private Router: Router, private recipeService: RecipeService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.ids = params?.ids?.split(",");
      this.candy = params?.candy;
      this.salty = params?.salty;
    });
    this.recipeService.findByIngredients().subscribe((recipes: Recipe[]) =>{
         this.recipes = recipes;
    });
  }
  
  setOpen(isOpen: boolean, recipe: Recipe) {
    this.recipeShow = recipe;
    this.isModalOpen = isOpen;
  }

}
