import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/userService";
@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.css"],
})
export class StudentListComponent implements OnInit {
  isAdmin;
  myData: any[];

  constructor(
    private userService: UserService,
    config: NgbModalConfig,
    private router: Router,
    private route: ActivatedRoute
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }
  p: number = 1;
  searchText;
  selectedUser: User;
  users: User[] = [];
  ngOnInit(): void {
    this.listUsers();
    this.users;
    this.chekAdmin();
  }

  chekAdmin() {
    return this.userService.isAdmin().subscribe((data) => {
      this.isAdmin = data;
      console.log(this.isAdmin);
    });
  }

  open2(user: User) {
    const navigationExtras: NavigationExtras = {
      state: {
        student: user,
      },
      relativeTo: this.route,
    };
    this.router.navigate(["/teacher/detail-student"], navigationExtras);
  }

  listUsers() {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response.filter((e) => e.userType == "student");

      console.log(this.users);
    });
  }

  deleteStudent(id) {
    this.userService.deleteUser(id).subscribe((data) => {
      console.log("deleted response", data);
      this.listUsers();
    });
  }
}
