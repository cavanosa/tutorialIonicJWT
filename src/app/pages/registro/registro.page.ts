import { Component, OnInit } from '@angular/core';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { concatMap } from 'rxjs/operators';
import { LoginUsuario } from 'src/app/models/login-usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nuevoUsuario: NuevoUsuario;
  loginUsuario: LoginUsuario;
  nombre = '';
  nombreUsuario = '';
  email = '';
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

  onRegister() {
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.nombreUsuario, this.email, this.password);
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.registro(this.nuevoUsuario).pipe(concatMap (nuevoRes => this.authService.login(this.loginUsuario))).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.isLogged = true;
        this.presentToast('cuenta creada');
        this.router.navigate(['/']);
      },
      err => {
        this.presentToast(err.error.mensaje);
      }
    );
  }

  vaciar() {
    this.nombre = '';
    this.nombreUsuario = '';
    this.email = '';
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
