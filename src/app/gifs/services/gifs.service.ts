import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gif, GifsResponse } from '../interfaces/GifsResponse';

declare const iniciar: any;
declare const agregarObjeto: any;
declare const llenarDatos: any;
declare const datos: any;

@Injectable({
  providedIn: 'root' // un servicio que se eleva al nivel mas alto, no es necesario registrarlo
})
export class GifsService {

  private apiKey: string = '7XTwnvC9PgkWB0oJO76znUWSTHYvjptt';
  private giphyURL: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  // TODO: cambiar any por tipo correspondiente
  public resultados: Gif[] = [];
  private db: IDBDatabase | undefined;

  get historial(): string[]{
    // rompiendo la relacion de tipo por referencia
    return [...this._historial];
  }

  constructor( private httpBrowser: HttpClient ){
    iniciar();
    
    if(datos && datos.length != 0 ){
      this._historial = datos;
    } else if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
    
    if(localStorage.getItem('ultimo')){
      this.resultados = JSON.parse(localStorage.getItem('ultimo')!);
    }
  }

  buscarGifs( elemento: string = '' ) {

    elemento = elemento.toLocaleLowerCase();

    if( !this._historial.includes(elemento) ){
      // con unshift la ultima aparece al principio
      this._historial.unshift(elemento);
      this._historial = this._historial.splice(0, 10);
      
      this._historial.forEach(elem => {
        if(!datos.includes(elem)){
          agregarObjeto(elem);
        }
      });
      localStorage.setItem('historial', JSON.stringify(this.historial));
    }

    const params = new HttpParams().
      set('api_key', this.apiKey).
      set('q', elemento).
      set('limit', '10');

    this.httpBrowser.get<GifsResponse>(`${ this.giphyURL }/search`, { params })
      .subscribe( resp => { //observable, permite hacer operaciones con los datos
        this.resultados = resp.data;
        localStorage.setItem('ultimo', JSON.stringify(resp.data));
      });
  }
}