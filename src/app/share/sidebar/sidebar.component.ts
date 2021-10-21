import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent{

  bd: any = null;

  get historial(): string[]{
    return this.gifsService.historial;
  }
  
  constructor( private gifsService: GifsService ){

  }

  buscar(elemento: string): void{
    this.gifsService.buscarGifs(elemento);
  }

}
