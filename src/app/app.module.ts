import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  exports: [NativePageTransitions],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, NativePageTransitions],
  bootstrap: [AppComponent],
})
export class AppModule {}
