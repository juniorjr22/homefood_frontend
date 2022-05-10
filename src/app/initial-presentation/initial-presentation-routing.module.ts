import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialPresentationComponent } from './initial-presentation.component';

const routes: Routes = [
  {
    path: '',
    component: InitialPresentationComponent,
    // children: [
    //   {
    //     path: 'initial-presentation2',
    //     loadChildren: () => import('../initial-presentation/initial-presentation.module').then(m => m.InitialPresentationPageModule)
    //   }
    // ]
  }
  // {
  //   path: '',
  //   redirectTo: '/initial-presentation',
  //   pathMatch: 'full'
  // }
];

// const routes: Routes = [
//   {
//     path: '',
//     component: InitialPresentationComponent,
//   }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class InitialPresentationPageRoutingModule {}
