import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { InitialPresentationComponent } from './initial-presentation.component';
import { SwiperModule } from 'swiper/angular'
import { InitialPresentationPageRoutingModule } from './initial-presentation-routing.module';
import SwiperCore, { Pagination } from 'swiper';

SwiperCore.use([Pagination]);

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    InitialPresentationPageRoutingModule,
    SwiperModule
  ],
  declarations: [
    InitialPresentationComponent
  ]
})
export class InitialPresentationPageModule { }
