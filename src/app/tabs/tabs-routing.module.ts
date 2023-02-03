import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'lastest-recipes',
        loadChildren: () => import('../lastest-recipes/latest-recipes.module').then(m => m.LatestRecipesModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then(m => m.SearchModule)
      },

      {
        path: 'recipes-found',
        loadChildren: () => import('../recipes-found/recipes-found.module').then(m => m.RecipesFoundModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
