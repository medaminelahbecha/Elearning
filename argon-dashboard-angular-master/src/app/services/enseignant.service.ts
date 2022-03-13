import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { UserService } from "./userService";
import { Enseignant } from "../models/enseignant";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class EnseignantService {
  private _loginObservable: BehaviorSubject<Object>;
  enseignantUrl: string = "http://localhost:3000/api/enseignant";
  getAllTeacherCount: string =
    "http://localhost:3000/api/enseignant/teacherCount";
  loginUrl: string = "http://localhost:3000/api/enseignant/login";
  profileUrl: string = "http://localhost:3000/api/enseignant";
  private getById: string = "http://localhost:3000/api/enseignant";

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {
    this._loginObservable = new BehaviorSubject({});
  }

  public get loginObservable() {
    return this._loginObservable;
  }

  private saveTokenToLOcalStorage(token: string) {
    localStorage.setItem("token", "bearer " + token);
  }
  getEnseignants() {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.httpClient.get(this.enseignantUrl, { headers }).pipe(
      map((result) => {
        return <Enseignant[]>result["enseignants"];
      })
    );
  }
  saveEnseignant(data: any) {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.httpClient.post(this.enseignantUrl, data, { headers }).pipe(
      map((result: { message; enseigant: Enseignant }) => {
        return <Enseignant>result.enseigant, result.message;
      })
    );
  }

  updateEnseignant(data, id) {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.httpClient.patch(`${this.enseignantUrl}/${id}`, data, {
      headers,
    });
  }

  getEnseignantById(id) {
    return this.httpClient
      .get<Enseignant>(`${this.getById}/${id}`)
      .pipe(map((response) => response));
  }

  deleteEnseignant(id) {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.httpClient.delete(`${this.enseignantUrl}/${id}`, { headers });
  }

  login(caredentials: { email: string; password: string }) {
    return this.httpClient.post(this.loginUrl, caredentials).pipe(
      map((result: loginResponce) => {
        this.saveTokenToLOcalStorage(result.token);
        localStorage.setItem("idTeacher", result.enseignantId);
        localStorage.setItem("userName", result.userName);
        this._loginObservable.next({});
        return result;
      })
    );
  }
  getProfile() {
    let id = localStorage.getItem("idTeacher") ?? "";
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.httpClient.get(`${this.profileUrl}/${id}`, { headers }).pipe(
      map((result) => {
        return result;
      })
    );
  }
  getOneEnseignant(id) {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.httpClient.get(`${this.profileUrl}/${id}`, { headers }).pipe(
      map((result) => {
        return result;
      })
    );
  }
  getTeacherCount() {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.httpClient.get(this.getAllTeacherCount, { headers }).pipe(
      map((result) => {
        return result;
      })
    );
  }
}
interface loginResponce {
  enseignantId;
  token: string;
  message: string;
  userName;
}
