import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotyfyService } from 'src/app/services/spotyfy.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent {
  artista:any = {};
  loading:boolean;
  topTracks:any[] = [];
  constructor(private router:ActivatedRoute,private _serviceSpotify:SpotyfyService) {
    this.loading = true;
    this.router.params.subscribe(params => {
      //console.log(params['id'])
      this.obtenerArtista(params['id']);
      this.getTopTracks(params['id']);
    })
  }
  obtenerArtista(id:string){
    this._serviceSpotify.getArtista(id).subscribe(elemento => {
      console.log(elemento)
      this.artista = elemento;
      console.log(this.artista)
      this.loading = false;
    })
  }
  getTopTracks(id:string){
    this._serviceSpotify.getTopTracks(id).subscribe(elemento => {
      console.log(elemento);
      this.topTracks = elemento;
    })
  }
}
