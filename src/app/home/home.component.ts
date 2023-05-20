import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private alertCrtl: AlertController) { }

  ngOnInit() {
    this.router.navigate(['/home/lastest-recipes']);
  }

  async showAlert() {
    const alert = await this.alertCrtl.create({
      header: 'Sobre o nosso Aplicativo',
      message: 'Aqui no HomeFood você consegue se aventurar na cozinha sem precisar se preocupar com os ingredientes, nosso objetivo é encontrar receitas com coisas que você tem em casa  O HomeFood foi desenvolvido para tornar sua experiência na cozinha mais fácil, com ele será possível encontrar receitas com os ingredientes que você tem em casa, sem precisar se preocupar. É bem simples, basta selecionar os ingredientes que você tem em casa e ele te indicará receitas com base nas suas escolhas. Os ingredientes SAL e ÁGUA não estão na lista, pois são itens básicos que tem em toda cozinha. Ah, os ingredientes que são de uso a gosto, mesmo estando em maio kkkkk também não são listados por que você só usa se quiser e na quantidade que preferir.',

      buttons: ['OK']
    });

    alert.present();
  }

}


