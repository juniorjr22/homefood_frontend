import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/Recipe';

@Component({
  selector: 'app-recipes-found',
  templateUrl: 'recipes-found.html',
  styleUrls: ['recipes-found.scss'],

})

export class Tab5Page {

  recipes: Recipe[];
  recipeShow: Recipe;
  ids = [];
  // candy = true;
  // salty = true;
  isModalOpen = false;
  public loaded = false;


  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private alertController: AlertController) { }

  ionViewDidEnter() {
    this.loaded = false;
    let urlIds = "";
    Preferences.get({ key: 'idsSelected' }).then(idsSelected => {
      this.ids = idsSelected.value.replace('[', '').replace(']', '').split(",");
      // Preferences.get({ key: 'isCandy' }).then(isCandy => {
      //   this.candy = isCandy?.value === 'true';
      //   Preferences.get({ key: 'isSalty' }).then(isSalty => {
      //     this.salty = isSalty?.value === 'true';
      for (let i = 0; i < this.ids.length; i++) {
        if (i == 0) {
          urlIds = urlIds + "?ids=" + this.ids[i];
        }
        else {
          urlIds = urlIds + "&ids=" + this.ids[i];
        }
      }
      console.log("urlIds = " + urlIds);
      if (urlIds != "?ids=") {
        this.recipeService.findByIngredients(urlIds).subscribe((recipes: Recipe[]) => {
          if (recipes.length === 0) {
            this.recipes = [];
            this.presentAlertNoRecipeFound();
          } else {
            this.recipes = recipes;
          }
          this.loaded = true;
        },
        () => {
          this.presentAlert();
        });
      } else {
        this.presentAlertNoIngredientSelected();
      }
      //   });
      // });
    });
  }

  async presentAlertNoRecipeFound() {
    const alert = await this.alertController.create({
      header: 'Nenhuma receita encontrada',
      message: 'Nenhuma receita foi encontrada com esses ingredientes. Verifique se você não esqueceu nenhum ingrediente, e tente novamente!',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['home/search']);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertNoIngredientSelected() {
    const alert = await this.alertController.create({
      header: 'Nenhum ingrediente selecionado',
      message: 'Selecione os ingredientes para nós encontrarmos uma receita para você ;D',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['home/search']);
          }
        }
      ]
    });

    await alert.present();
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
