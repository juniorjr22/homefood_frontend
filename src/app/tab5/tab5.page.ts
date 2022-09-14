import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page implements OnInit {

  ids = [];
  candy = true;
  salty = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.ids = params?.ids?.split(",");
      this.candy = params?.candy;
      this.salty = params?.salty;
    });
  }

}
