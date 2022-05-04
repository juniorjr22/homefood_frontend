import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-presentation',
  templateUrl: './initial-presentation.component.html',
  styleUrls: ['./initial-presentation.component.scss'],
})
export class InitialPresentationComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  navigateToHome() {
    this.router.navigate(['/home']);
  }

}
