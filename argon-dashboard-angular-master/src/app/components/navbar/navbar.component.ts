import { Component, OnInit, ElementRef } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/userService";
import { EnseignantService } from "src/app/services/enseignant.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  user;
  teacher;
  isTeacher;
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private userService: UserService,
    private enseignantService: EnseignantService
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);

    this.chekTeacher();
    this.userName;
  }
  chekTeacher() {
    return this.userService.isTeacher().subscribe((data) => {
      this.isTeacher = data;
      console.log(this.isTeacher);
    });
  }
  logout() {
    this.userService.logout();
    this.router.navigate(["login"]);
  }
  userName = localStorage.getItem("userName") ?? "";
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }
}
