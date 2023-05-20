import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import * as _ from 'lodash';
import { Ingredient } from '../models/ingredient';
import { IngredientService } from '../services/ingredient.service';

import { ViewChild } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AlertController, IonCheckbox, IonInfiniteScroll } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: 'search.html',
  styleUrls: ['search.scss']
})

export class Search implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  formGroup = new FormGroup({
    ingredients: new FormArray([]),
    // candy: new FormControl(true),
    // salty: new FormControl(true),
    allSelected: new FormControl(false),
  });

  listIngredients: Ingredient[];
  allIngredients: Ingredient[];
  listIngredientsChecked = [];
  queryText: string;
  orderedIngredients;
  public loaded = false;
  environment = environment;

  get ordersFormArray() {
    return this.formGroup.controls.ingredients as FormArray;
  }

  constructor(
    private router: Router,
    private ingredientService: IngredientService,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
        this.ingredientService.getIngredient().subscribe((ingredients: Ingredient[]) => {
          this.sortIngredients(ingredients);
          this.saveIngredientsInLocalStorage(ingredients);
        },
        () => {
          this.presentAlert();
          try {
            const ingredients = this.getIngredientsInLocalStorage();
            ingredients.then(ingredientsLocal => {
              this.sortIngredients(ingredientsLocal);
            });
          } catch {
            this.presentAlert();
          }
        });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: 'Ocorreu um erro ao buscar os ingredientes!',
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

  clearIngredientList() {
    const meuFormArray: FormArray = this.formGroup.get('ingredients') as FormArray;
    for (const control of meuFormArray.controls) {
      control.setValue(false);
    }
    this.listIngredientsChecked = [];
  }

  sortIngredients(ingredients: Ingredient[]) {
    this.listIngredients = _.values(ingredients);

    this.queryText = '';

    this.allIngredients = _.values(this.listIngredients);
    this.orderedIngredients = _.values(this.allIngredients);
    this.orderedIngredients.sort(function (ingredientA, ingredientB) { return ingredientB.id - ingredientA.id });
    for (let i = 0; i <= this.orderedIngredients[0].id; i++) {
      this.ordersFormArray.push(new FormControl(false));
    }
    this.loaded = true;
  }

  async saveIngredientsInLocalStorage(ingredients: Ingredient[]) {
    await Preferences.set({
      key: 'ingredients',
      value: JSON.stringify(ingredients),
    });
  }

  async getIngredientsInLocalStorage() {
    const { value } = await Preferences.get({ key: 'name' });
    return JSON.parse(value);
  }

  async navigateToSelect() {
    let idsSelected = [];
    for (let i = 0; i <= this.orderedIngredients[0].id; i++) {
      if (this.formGroup.get('allSelected').value === true) {
        idsSelected.push(i);
      } else {
        let idIsSelected = this.formGroup.get('ingredients').get(`${i}`).value;
        if (idIsSelected) {
          idsSelected.push(i);
        }
      }
    }
    if (idsSelected.length > 0) {
      await Preferences.set({
        key: 'idsSelected',
        value: JSON.stringify(idsSelected),
      });
      // await Preferences.set({
      //   key: 'isCandy',
      //   value: this.formGroup.get('candy').value,
      // });
      // await Preferences.set({
      //   key: 'isSalty',
      //   value: this.formGroup.get('salty').value,
      // });
      this.router.navigate(['home/recipes-found']);
    } else {
      this.presentAlertNoIngredientSelected();
    }

  }

  async presentAlertNoIngredientSelected() {
    const alert = await this.alertController.create({
      header: 'Nenhum ingrediente selecionado',
      message: 'Selecione os ingredientes para nós encontrarmos uma receita para você ;D',
      buttons: [
        {
          text: 'OK',
          role: 'confirm'
        }
      ]
    });

    await alert.present();
  }

  filterIngredient(ingredient: any) {
    let val = ingredient.target.value;
    if (val && val.trim() != '') {
      this.listIngredients = _.values(this.allIngredients);
      this.listIngredients = this.listIngredients.filter((ingredient) => {
        return (ingredient.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.listIngredients = this.allIngredients;
    }
  }

  setCheckedIngredients() {
    setTimeout(() => {
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

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}


