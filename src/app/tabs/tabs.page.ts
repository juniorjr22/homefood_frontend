import { Component } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  loaded: boolean = false;
  tabIndex: number = 0;

  constructor(private nativePageTransitions: NativePageTransitions) {}

  //Look the index to see which direction to go (if you have more than 3 tabs)
  private getAnimationDirection(e: any): string {
    var currentIndex = this.tabIndex

    this.tabIndex = e.index
    // or 
    // this.tabIndex = Object.keys(this.tabs).indexOf(e.tab)

    switch (true) {
      case currentIndex < e.index:
        return 'left'
      case currentIndex > e.index:
        return 'right'
    }
  }

  transition(e: any): void {
    let options: NativeTransitionOptions = {
      direction: this.getAnimationDirection(e),
      duration: 250,
      slowdownfactor: -1,
      slidePixels: 0,
      iosdelay: 20,
      androiddelay: 0,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 48,
    }

    if (!this.loaded) {
      this.loaded = true
      return
    }

    this.nativePageTransitions.slide(options)
  }

}
