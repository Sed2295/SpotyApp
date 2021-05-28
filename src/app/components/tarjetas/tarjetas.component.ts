import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent {
  //el decorador @Input() nos sirve para importar nuevas canciones del componente home
  @Input() items:any[] = [];

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  verArtista(item:any){
    //console.log(item)
    let artistId:any;
    if(item.type === 'artist'){
      artistId = item.id
    }else {
      artistId  = item.artists[0].id
    }
    //console.log(artistId);
    this.router.navigate(['artist/',artistId])
  }

}
