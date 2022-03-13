import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { UserService } from "./userService";
import { Seance } from "../models/seance";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class SeanceService {
  private _loginObservable: BehaviorSubject<Object>;
  seancetUrl: string = "http://localhost:3000/api/seance";
  getAllSeanceCount: string = "http://localhost:3000/api/seance/seanceCount";
  seancetUrlCalendar: string = "http://localhost:3000/api/seance/calendar";
  seanceStuUrl: string = "http://localhost:3000/api/seance/seanceS";
  seanceEnsUrl: string = "http://localhost:3000/api/seance/seanceT";
  userCUrl: string = "http://localhost:3000/api/seance/userConnecte";
  seanceCalEnsUrl: string = "http://localhost:3000/api/seance/teacher";
  seanceCalStuUrl: string = "http://localhost:3000/api/seance/student";
  loginUrl: string = "http://localhost:3000/api/enseignant/login";
  enseignantUrl: string = "http://localhost:3000/api/enseignant";

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {
    this._loginObservable = new BehaviorSubject({});
  }

  public get loginObservable() {
    return this._loginObservable;
  }

  getSeanceCalendarEns(id: String) {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.httpClient
      .get(`${this.seanceCalEnsUrl}/${id}`, { headers })
      .pipe(
        map((result: { count: number; seances: Seance[] }) => {
          return result.seances;
        })
      );
  }
  getSeanceCalendarStu(id: String) {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.httpClient
      .get(`${this.seanceCalStuUrl}/${id}`, { headers })
      .pipe(
        map((result: { count: number; seances: Seance[] }) => {
          return result.seances;
        })
      );
  }
  getSeanceStudent(id: String) {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.httpClient.get(`${this.seanceStuUrl}/${id}`, { headers }).pipe(
      map((result: { count: number; seances: Seance[] }) => {
        return result.seances;
      })
    );
  }
  getSeanceEnseignant(id: String) {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.httpClient.get(`${this.seanceEnsUrl}/${id}`, { headers }).pipe(
      map((result: { count: number; seances: Seance[] }) => {
        return result.seances;
      })
    );
  }

  private saveTokenToLOcalStorage(token: string) {
    localStorage.setItem("token", "bearer " + token);
  }
  getUserConnecte() {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });

    return this.httpClient.get(this.userCUrl, { headers }).pipe(
      map((result) => {
        return result;
      })
    );
  }

  getAllSeance() {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.httpClient.get(this.seancetUrl, { headers }).pipe(
      map((result: { count: number; seances: Seance[] }) => {
        return result.seances;
      })
    );
  }

  getAllSeanceCalendar() {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.httpClient.get(this.seancetUrlCalendar, { headers }).pipe(
      map((result: { count: number; seances: Seance[] }) => {
        return result.seances;
      })
    );
  }

  getEnseignantByID(id) {
    return this.httpClient.get(`${this.enseignantUrl}/${id}`).pipe(
      map((result) => {
        return result;
      })
    );
  }

  saveSeance(data: any) {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.httpClient.post(this.seancetUrl, data, { headers }).pipe(
      map((result: { message: string; seances: Seance }) => {
        return <Seance>result.seances;
      })
    );
  }

  updateSeance(data, id) {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.httpClient.patch(`${this.seancetUrl}/${id}`, data, { headers });
  }

  changeStatus(data: { presence: string }, id: string) {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.httpClient.patch(this.seancetUrl + "/" + id, data, { headers });
  }

  deleteSeance(id) {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.httpClient.delete(`${this.seancetUrl}/${id}`, { headers });
  }

  login(caredentials: { email: string; password: string }) {
    return this.httpClient.post(this.loginUrl, caredentials).pipe(
      map((result: loginResponce) => {
        this.saveTokenToLOcalStorage(result.token);
        this._loginObservable.next({});
        return result;
      })
    );
  }

  getSeancesCount() {
    let headers = new HttpHeaders({
      authorization: this.userService.getToken(),
    });
    return this.httpClient.get(this.getAllSeanceCount, { headers }).pipe(
      map((result) => {
        return result;
      })
    );
  }
}
interface loginResponce {
  token: string;
  message: string;
}
