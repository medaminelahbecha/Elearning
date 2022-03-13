import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from 'src/app/models/user';
import {map} from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _loginObservable : BehaviorSubject<Object>;
  private getAllUserUrl="http://localhost:3000/api/users";
  private profileUrl="http://localhost:3000/api/users/me";
  private getAllUserCount="http://localhost:3000/api/users/userCount";
  private userSingupUrl="http://localhost:3000/api/users/signup";
  private userLoginUrl="http://localhost:3000/api/users/login";
  private isAdminUrl="http://localhost:3000/api/users/is-admin";
  private isStudentUrl="http://localhost:3000/api/users/is-student";
  private isTeachertUrl="http://localhost:3000/api/users/is-teacher";
  constructor(private http:HttpClient) {
    this._loginObservable= new  BehaviorSubject({}) ; 
  }
  public get loginObservable(){
    return this._loginObservable
  }

private saveTokenToLOcalStorage(token : string){
  localStorage.setItem('token', "bearer "+token)
}

private saveUserToLOcalStorage(_id : string){
  localStorage.setItem('_id', _id)
}

logout(){
  localStorage.removeItem('token')
  this._loginObservable.next({})
}
updateUser(data, id) {
  let headers = new HttpHeaders({
    'authorization': this.getToken()
  })
  return this.http.patch(`${this.getAllUserUrl}/${id}`, data, { headers })
}

isAdmin(){
  let headers = new HttpHeaders({
    'authorization':this.getToken()
  })
  return this.http.get(this.isAdminUrl,{headers}).pipe(
    map(resuult=>{
      return resuult
    })
  )
}
isStudent(){
  let headers = new HttpHeaders({
    'authorization':this.getToken()
  })
  return this.http.get(this.isStudentUrl,{headers}).pipe(
    map(resuult=>{
      return resuult
    })
  )
}
isTeacher(){
  let headers = new HttpHeaders({
    'authorization':this.getToken()
  })
  return this.http.get(this.isTeachertUrl,{headers}).pipe(
    map(resuult=>{
      return resuult
    })
  )
}
getToken(){
  return localStorage.getItem('token') ?localStorage.getItem('token'): "";
}

getUserConnecte(){
  return localStorage.getItem('_id') ?localStorage.getItem('_id'): "";
}

isLoggedIn(){
  if(this.getToken() !=''){
    return true ;
  }
  return false ;
}

  signup(user : any){
    return this.http.post(this.userSingupUrl,user)
    .pipe(
      map(result=>{
       return <{message : string}>result
      })
    )
  }
  getAll(){
    let headers = new HttpHeaders({
      'authorization':this.getToken()
    })
    return this.http.get(this.getAllUserUrl,{headers})
    .pipe(
      map((result :{users : User[]})=>{
       return result.users
      })
    )
  }
  getUserCount(){
    let headers = new HttpHeaders({
      'authorization':this.getToken()
    })
    return this.http.get(this.getAllUserCount,{headers})
    .pipe(
      map((result )=>{
       return result
      })
    )
  }
  getProfile(){
    let headers = new HttpHeaders({
      'authorization':this.getToken()
    })
    return this.http.get(this.profileUrl,{headers})
    .pipe(
      map((result )=>{
       return result
      })
    )
  }
  getAllUsers(){
    let headers = new HttpHeaders({
      'authorization':this.getToken()
    })
    return this.http.get(this.getAllUserUrl,{headers}).pipe(
      map(result=>{
       return <User[]> result['users']
      })
    )
  }
  login(caredentials : {email :string , password : string}){
    return this.http.post(this.userLoginUrl,caredentials)
    .pipe(
      map((result : loginResponce)=>{
        this.saveTokenToLOcalStorage(result.token)
        localStorage.setItem('userId', result.userId)
        localStorage.setItem('userName', result.userName)
        this._loginObservable.next({});
        return result
      })
    )
  }

  deleteUser(id){
    let headers = new HttpHeaders({
      'authorization': this.getToken()
    })
    return this.http.delete(`${this.getAllUserUrl}/${id}`,{headers});
  }
}

interface loginResponce{
  token : string,
  message : string,
  _id :string,
  userId ,
  userName
}