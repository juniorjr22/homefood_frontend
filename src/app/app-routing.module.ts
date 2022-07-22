import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InitialPresentationComponent } from './initial-presentation/initial-presentation.component';
import { TabsPage } from './tabs/tabs.page';

const routes: Routes = [
  // {path: '', redirectTo: 'teste', pathMatch: 'full'},
  {path: '', redirectTo: 'initial-presentation', pathMatch: 'full'},
  {
    path: 'initial-presentation',
    loadChildren: () => import('./initial-presentation/initial-presentation.module').then(m => m.InitialPresentationPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },

  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then(m => m.Tab4PageModule)
  }
  // {path: 'initial-presentation', component: InitialPresentationComponent}
  // {
  //   path: "",
  //   component: AppComponent,
  //   children: [
  //     {path: 'initial-presentation', component: InitialPresentationComponent}
  //     // {path: 'home', component: HomeComponent},
  //     // {path: 'tabs', component: TabsPage},
  //   ]
  // }
  
  // {
  //   path: 'initial-presentation',
  //   loadChildren: () => import('./initial-presentation/initial-presentation.module').then(m => m.InitialPresentationPageModule)
  // }
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // }
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
