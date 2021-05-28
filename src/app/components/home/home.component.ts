import { Component, OnInit } from '@angular/core';
//importacion para realizar peticiones
import { HttpClient } from '@angular/common/http';
import { SpotyfyService } from 'src/app/services/spotyfy.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //paises:any[] = [];
  nuevasCanciones:any[] = [];
  loading:boolean;
  error:boolean;
  err_msg:string;

  constructor(private http:HttpClient,private _SpotifyService:SpotyfyService) {
    /*
    Ejemplo de peticion get sencilla 
    console.log('Constructor del home realizado');
    //paises es el nombre que yo quiera dar
    this.http.get('https://restcountries.eu/rest/v2/lang/es').subscribe((paisesE:any) => {
      this.paises = paisesE;
      console.log(paisesE)
    }) 
    */
    this.loading = true;
    this.error = false;
    this._SpotifyService.getNewReleases()
    //Observable con manejo de errores
      .subscribe((data:any) => {
        console.log(data)
        this.nuevasCanciones = data
        this.loading = false;
      },(errorServicio)=>{
        this.loading = false;
        this.error = true;
        this.err_msg = errorServicio.error.error.message;
        console.log(errorServicio.error.error.message);
      })
  }
  ngOnInit(): void {
  }
}
