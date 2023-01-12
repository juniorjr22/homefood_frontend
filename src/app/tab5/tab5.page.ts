import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  public loaded = false;
  

  constructor(
    private router: Router, 
    private recipeService: RecipeService, 
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController) {}
  
  ngOnInit() {
      let urlIds = "";
      this.activatedRoute.params.subscribe((params) => {
      this.ids = params?.ids?.split(",");
      this.candy = params?.candy;
      this.salty = params?.salty;
      

      for(let i = 0; i < this.ids.length; i++) {
        
        if(i == 0){
           urlIds = urlIds + "?ids=" + this.ids[i];
        }
        else{
           urlIds = urlIds + "&ids=" + this.ids[i];
        }
                   
        
      }

    });
    this.recipeService.findByIngredients(urlIds).subscribe((recipes: Recipe[]) =>{
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
