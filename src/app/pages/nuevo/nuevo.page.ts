import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.page.html',
  styleUrls: ['./nuevo.page.scss'],
})
export class NuevoPage implements OnInit {

  producto: Producto;
  nombre = '';
  precio = null;

  msjOK = '';
  msjErr = '';

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  onCreate() {
    this.producto = new Producto(this.nombre, this.precio);
    this.productoService.nuevo(this.producto).subscribe(
      data => {
        this.presentToast(data.mensaje);
        this.volver();
      },
      err => {
        this.presentToast(err.error.mensaje);
      }
    );
  }

  vaciar() {
    this.nombre = '';
    this.precio = null;
  }

  volver() {
    this.router.navigate(['/admin']);
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

}
