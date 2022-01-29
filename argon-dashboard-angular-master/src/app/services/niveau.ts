import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UserService } from './userService';
import { Niveau } from '../models/niveau';
@Injectable({
  providedIn: 'root'
})
export class NiveauxService {
  
 niveauUrl : string="http://localhost:3000/api/niveau";
 userCUrl : string="http://localhost:3000/api/seance/userConnecte";

  constructor(private httpClient: HttpClient,private userService : UserService ) {   }

  

  

  

  
  getNiveau(id : String){
    let headers = new HttpHeaders({
      'authorization': this.userService.getToken()
    })
    return this.httpClient.get(`${this.niveauUrl}/${id}`,{headers}) .pipe(
        map((result: { count: number, niveaux: Niveau[] }) => {
          return result.niveaux
    
        }
        )
      )
  }
 

  saveNiveau(data : any){
    let headers = new HttpHeaders({
      'authorization': this.userService.getToken()
    })
    return this.httpClient.post(this.niveauUrl, data, { headers })
    .pipe(
      map((result: {message :string ,  niveau: Niveau }) => {
        return <Niveau>result.niveau

      }
      )
    )
  }

  

  getUserConnecte(){
    let headers = new HttpHeaders({
        'authorization': this.userService.getToken()
      })
  return this.httpClient.get(this.userCUrl,{headers}).pipe(
        map(result=>{ 
         return result
        })
      )
  }
  

 
 

  

 
}
