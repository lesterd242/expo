import { Component, OnInit } from '@angular/core';


import { Gif } from '../interfaces/GifsResponse';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent{

  get resultados(): Gif[]{
    /* 
     * de nuevo ocupando un parametro de otra clase, cuando ese parametro se 
     * modifica, se mandan a ejecutar de nuevo los lugares que se ocupan
     */ 
    return this.gifsService.resultados;
  }

  constructor( private gifsService: GifsService) { }

}
