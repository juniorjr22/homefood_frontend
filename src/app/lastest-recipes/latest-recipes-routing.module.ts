import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LatestRecipes } from './lastest-recipes';

const routes: Routes = [
  {
    path: '',
    component: LatestRecipes,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LatestRecipesRoutingModule { }
