import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UserService } from './userService';
import { Cours } from '../models/cours';
import { Lesson } from '../models/lesson';
@Injectable({
  providedIn: 'root'
})
export class CoursService {
  
 coursUrl : string="http://localhost:3000/api/cours";
 lessonUrl : string="http://localhost:3000/api/lesson";

  constructor(private httpClient: HttpClient,private userService : UserService ) {   }

  

  

  

  
  getCours(){
    let headers = new HttpHeaders({
      'authorization': this.userService.getToken()
    })
    return this.httpClient.get(this.coursUrl,{headers}) .pipe(
        map((result: { count: number, cours: Cours[] }) => {
          return result.cours
    
        }
        )
      )
  }
  getLesson(){
    let headers = new HttpHeaders({
      'authorization': this.userService.getToken()
    })
    return this.httpClient.get(this.lessonUrl,{headers}) .pipe(
        map((result: { count: number, lessons: Lesson[] }) => {
          return result.lessons
    
        }
        )
      )
  }
 

  saveCours(data : any){
    let headers = new HttpHeaders({
      'authorization': this.userService.getToken()
    })
    return this.httpClient.post(this.coursUrl, data, { headers })
    .pipe(
      map((result: {message :string ,  cours: Cours }) => {
        return <Cours>result.cours

      }
      )
    )
  }
  saveLesson(data : any){
    let headers = new HttpHeaders({
      'authorization': this.userService.getToken()
    })
    return this.httpClient.post(this.lessonUrl, data, { headers })
    .pipe(
      map((result: {message :string ,  lesson: Lesson }) => {
        return <Lesson>result.lesson

      }
      )
    )
  }

  deleteCourse(id){
    let headers = new HttpHeaders({
      'authorization': this.userService.getToken()
    })
    return this.httpClient.delete(`${this.coursUrl}/${id}`,{headers});
  }
  deleteLesson(id){
    let headers = new HttpHeaders({
      'authorization': this.userService.getToken()
    })
    return this.httpClient.delete(`${this.lessonUrl}/${id}`,{headers});
  }

  
  

 
 

  

 
}
