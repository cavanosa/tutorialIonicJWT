import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.cargar();
  }

  ionViewWillEnter() {
    this.cargar();
  }

  cargar(): void {
    this.productoService.lista().subscribe(
      data => {
        this.productos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar(id: number): void {
    this.productoService.eliminar(id).subscribe(
      data => {
        this.presentToast(data.mensaje);
        this.cargar();
      },
      err => {
        this.presentToast(err.error.mensaje);
      }
    );
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  async borrarConfirm(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿seguro que lo deseas eliminar?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.borrar(id);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }

}
