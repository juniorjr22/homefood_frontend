import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialPresentationComponent } from './initial-presentation.component';

const routes: Routes = [
  {
    path: 'initial-presentation',
    component: InitialPresentationComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../initial-presentation/initial-presentation.module').then(m => m.InitialPresentationPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/initial-presentation',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class InitialPresentationPageRoutingModule {}
