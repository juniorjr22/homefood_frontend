import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab5Page } from './recipes-found';

const routes: Routes = [
  {
    path: '',
    component: Tab5Page,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesFoundRoutingModule { }
