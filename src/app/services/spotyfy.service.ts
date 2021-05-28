import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//operador para filtrar resultados de peticiones
import { map } from 'rxjs/operators';
//Nota con el provideIn no es necesario declarar e importar nuestros servicios en el archivo app.module.ts
@Injectable({
  providedIn: 'root'
})
export class SpotyfyService {

  constructor(private http:HttpClient) {
    console.log('Servicio de spotify iniciado')
  }
  //Recuerda generar el token porque solo dura una hora
  getQuery(query:string){
    const url = `https://api.spotify.com/v1${query}`;
    const headers = new HttpHeaders({
      'Authorization':'Bearer QD-PYdsfMHyaIF1fNWvBEh0HMsH5_bjNYwng19Pdgwdr_i-kbgOF0y4rNKD7dbGh2s9iFvDMcw3GF1s5hY'
    })
    return this.http.get(url,{headers})
  }

  getNewReleases(){
    return this.getQuery('/browse/new-releases')
      .pipe( map( data => {
        //recuerda que para acceder a albums en este caso lo pusimos con llave si quisieramos acceder como objeto en la data deberiamos ponerle (data:any)
        return data['albums'].items;
      }));      
  }
  getArtistas(termino:string){
   /*  const headers = new HttpHeaders({
      'Authorization':'Bearer BQCd6FFlX6Q6iWptYrBmBQ5afxMW6dfYGzGmCcFpm9noKhWWST-8_PyrdT7CVJly1romQTRc9rb9chaeneY'
    }) */
    /* 
      Forma 1 sin hacer uso de pipes y map para filtrar informacion no filtrmos informacion y eso lo hacemos en el momento de llamar el servicio
      return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`,{headers}); 
    */
    //Forma 2 quitamos el return por que solo regresamos una sola linea
    
    //Forma 1 de filtrar la informacion sin optmizar codigo con el metodo getQuery asi usamos la const autorizathion y usamos map y pipe en los dos metodos pero optimizandolo ya no
   /*  return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`,{headers})
      .pipe( map( (data:any) => data.artists.items )) */

    return this.getQuery(`/search?q=${termino}&type=artist&limit=15`)
      .pipe( map( resultado => resultado['artists'].items ))
  }
  getArtista(id:string){
    return this.getQuery(`/artists/${id}`)
    //El pipe no es necesario por que no necesito filtrar nada la informacion ya viene como la necesito  
    //.pipe( map (resultado => resultado))
  }
  getTopTracks(id:string){
    return this.getQuery(`/artists/${id}/top-tracks?market=us`)
      .pipe( map (resultado => resultado['tracks']))
  }
}
