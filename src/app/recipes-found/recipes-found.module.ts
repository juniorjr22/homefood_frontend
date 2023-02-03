import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab5Page } from './recipes-found';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { RecipesFoundRoutingModule } from './recipes-found-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RecipesFoundRoutingModule
  ],
  declarations: [Tab5Page]
})
export class RecipesFoundModule { }
