import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-latest-recipes',
  templateUrl: 'latest-recipes.html',
  styleUrls: ['latest-recipes.scss']
})
export class LatestRecipes implements OnInit {

  recipes: Recipe[];
  public loaded = false;
  recipeShow: Recipe;
  isModalOpen = false;

  constructor(
    private recipeService: RecipeService,
    private alertController: AlertController,
    private router: Router
  ) { }

  async ngOnInit() {
    this.recipeService.findLastTen().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
      this.loaded = true;
    },
    () => {
      this.presentAlert();
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: 'Ocorreu um erro ao buscar as receitas!',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['home/lastest-recipes']);
          }
        }
      ]
    });

    await alert.present();
  }

  setOpen(isOpen: boolean, recipe: Recipe) {
    this.recipeShow = recipe;
    this.isModalOpen = isOpen;
  }
}
