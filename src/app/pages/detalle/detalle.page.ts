import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  producto: Producto;

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    setTimeout( () => this.cargar() , 2000);
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

  volver(): void {
    const redirectUrl = (this.tokenService.isAdmin() ? '/admin' : '/user');
    this.router.navigate([redirectUrl]);
  }

}
