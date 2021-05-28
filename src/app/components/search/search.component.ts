import { Component } from '@angular/core';
import { SpotyfyService } from 'src/app/services/spotyfy.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  busqueda:any[] = [];
  loading: boolean;

  constructor(private _spotifyService:SpotyfyService) {}
  
  buscar(termino:string){
    console.log(termino)
    this.loading = true;
    this._spotifyService.getArtistas(termino).subscribe((resultado:any) => {
      console.log(resultado);
      this.busqueda = resultado;
      this.loading = false;
    })
  }

}
