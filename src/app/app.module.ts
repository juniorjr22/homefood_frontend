import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
// import { NativePageTransitions } from '@awesome-cordova-plugins/native-page-transitions/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IngredientService } from './services/ingredient.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,],
  // exports: [NativePageTransitions],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, IngredientService],
  bootstrap: [AppComponent],
})
export class AppModule {}
