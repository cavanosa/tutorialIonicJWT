import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  producto: Producto = new Producto('', null);

  msjOK = '';
  msjErr = '';

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.cargar();
  }

  cargar(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.productoService.detalle(id).subscribe(
      data => {
        this.producto = data;
      },
      err => {
        this.volver();
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.productoService.actualizar(id, this.producto).subscribe(
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
    this.producto.nombre = '';
    this.producto.precio = null;
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
