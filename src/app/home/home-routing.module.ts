import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    children: [
      {
        path: '',
        loadChildren: () => import('../tabs/tabs.module').then(m => m.TabsPageModule)
      }
    ]
  }
  // {
  //   path: '',
  //   redirectTo: '/home'
  //   // pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class HomeRoutingModule {}
