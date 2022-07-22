import { Component } from '@angular/core';
import { Router } from '@angular/router';

import * as _ from 'lodash';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})

export class Tab4Page {

  

  listIngredients= [

    {id: 1, name: "Arroz"},
    {id: 2, name: "Feijão"},
    {id: 3, name: "Macarrão"},
    {id: 4, name: "Batata"},
    {id: 5, name: "Azeite"},
    {id: 6, name: "Pão de Forma"},
    {id: 7, name: "Alcatra"},
    {id: 8, name: "Maminha"},
    {id: 9, name: "Frango"}
    
  ]
  
  allIngredients:any; 
  queryText: string;

  constructor(private router: Router) {
    this.queryText = '';
    
    this.allIngredients = this.listIngredients;

  }

  navigateToSelect(){
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
