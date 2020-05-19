import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ToastController } from '@ionic/angular';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUsuario: LoginUsuario;
  nombreUsuario = '';
  password = '';

  isLogged = false;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.testLogged();
  }

  ionViewWillEnter() {
    this.testLogged();
    this.vaciar();
  }


  onLogin() {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.isLogged = true;
        this.router.navigate(['/']);
      },
      err => {
        this.presentToast(err.error.message);
      }
    );
  }

  vaciar() {
    this.nombreUsuario = '';
    this.password = '';
  }

  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  logOut(): void {
    this.tokenService.logOut();
    this.isLogged = false;
    this.vaciar();
  }

  testLogged(): void {
    this.isLogged = this.tokenService.getToken() != null;
  }

}
