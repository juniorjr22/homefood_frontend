import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Recipe } from '../models/Recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  recipes: Recipe[];
  public loaded = false;
  recipeShow: Recipe;
  isModalOpen = false;

  constructor(
    private recipeService: RecipeService,
    private alertController: AlertController,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.recipeService.findLastTen().subscribe((recipes: Recipe[]) =>{
      this.recipes = recipes;
      this.loaded = true;
    },
    error => {
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
            this.router.navigate(['home/tab1']);
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
