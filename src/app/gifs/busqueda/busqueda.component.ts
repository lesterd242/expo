import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

declare const retornarDatos: any;

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {
  //non-null assertion, referenciando un elemento del html mediante un atributo local
  @ViewChild('txtBuscar') public busqueda!: ElementRef<HTMLInputElement>;
  bd: string | any = null;

  constructor( private gifsService: GifsService ) {

  }

  buscar() {
    const valor = this.busqueda.nativeElement.value;
    
    if(valor.trim().length === 0){
      return;
    }

    this.gifsService.buscarGifs( valor );
    this.busqueda.nativeElement.value = '';

  }
}