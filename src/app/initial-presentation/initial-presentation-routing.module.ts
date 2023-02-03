import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialPresentationComponent } from './initial-presentation.component';

const routes: Routes = [
  {
    path: '',
    component: InitialPresentationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class InitialPresentationPageRoutingModule { }
