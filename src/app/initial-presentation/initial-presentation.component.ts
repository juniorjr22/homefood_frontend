import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-initial-presentation',
  templateUrl: './initial-presentation.component.html',
  styleUrls: ['./initial-presentation.component.scss'],
})
export class InitialPresentationComponent implements OnInit {

  isInitialPresentation: boolean = false;

  constructor(
    private router: Router
  ) { }

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'initialPresentation' });
    if (value === 'true') {
      this.router.navigate(['/home']);
    } else {
      this.isInitialPresentation = true;
    }

  }

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  async navigateToHome() {
    await Preferences.set({
      key: 'initialPresentation',
      value: 'true',
    });
    this.router.navigate(['/home']);
  }

}
