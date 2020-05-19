import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isLogged = false;
  userName = 'pepito';

  constructor(
    private tokenService: TokenService
  ) {}

  ionViewWillEnter() {
    this.testLogged();
  }

  testLogged(): void {
    this.isLogged = this.tokenService.getToken() != null;
    this.userName = this.tokenService.getUserName();
  }

}
