import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UserService } from './userService';
import { Commentaire } from '../models/commentaire';
@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  
 commentaireUrl : string="http://localhost:3000/api/commentaire";
 userCUrl : string="http://localhost:3000/api/seance/userConnecte";

  constructor(private httpClient: HttpClient,private userService : UserService ) {   }

  

  

  

  
  getCommenatires(id : String){
    let headers = new HttpHeaders({
      'authorization': this.userService.getToken()
    })
    return this.httpClient.get(`${this.commentaireUrl}/${id}`,{headers}) .pipe(
        map((result: { count: number, commentaires: Commentaire[] }) => {
          return result.commentaires
    
        }
        )
      )
  }
 

  saveCommentaire(data : any){
    let headers = new HttpHeaders({
      'authorization': this.userService.getToken()
    })
    return this.httpClient.post(this.commentaireUrl, data, { headers })
    .pipe(
      map((result: {message :string ,  commentaire: Commentaire }) => {
        return <Commentaire>result.commentaire

      }
      )
    )
  }

  deleteCommentaire(id){
    let headers = new HttpHeaders({
      'authorization': this.userService.getToken()
    })
    return this.httpClient.delete(`${this.commentaireUrl}/${id}`,{headers});
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
