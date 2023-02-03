import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LatestRecipes } from './lastest-recipes';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { LatestRecipesRoutingModule } from './latest-recipes-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    LatestRecipesRoutingModule
  ],
  declarations: [LatestRecipes]
})
export class LatestRecipesModule { }
