import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {
  NgbModalConfig,
  NgbModal,
  ModalDismissReasons,
} from "@ng-bootstrap/ng-bootstrap";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/userService";
import { MessageService } from "primeng/api";
@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.css"],
  providers: [MessageService],
})
export class StudentsComponent implements OnInit {
  myData: any[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private http: HttpClient,
    private messageService: MessageService
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }
  p: number = 1;
  closeResult: string;
  searchText;
  selectedUser: User;
  users: User[] = [];
  ngOnInit(): void {
    //
    this.http
      .get("https://trial.mobiscroll.com/content/countries.json")
      .subscribe((resp: any) => {
        const countries = [];
        for (let i = 0; i < resp.length; ++i) {
          const country = resp[i];
          countries.push({ text: country.text, value: country.value });
        }
        this.myData = countries;
        console.log(countries);
      });
    this.listUsers();
    this.users;
  }

  open4(content, id) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result === "yes") {
            this.deleteStudent(id);
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  open(content) {
    this.modalService.open(content);
  }
  open2(content2, user: User) {
    this.selectedUser = user;
    this.modalService.open(content2);
  }

  open3(user: User) {
    const navigationExtras: NavigationExtras = {
      state: {
        student: user,
      },
      relativeTo: this.route,
    };

    return this.router.navigate(["/teacher/detail-student"], navigationExtras);
  }
  listUsers() {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response.filter((e) => e.userType == "student");
      console.log(this.users);
    });
  }

  readValueFromForm(form: HTMLFormElement) {
    let name = (<HTMLInputElement>form.elements.namedItem("name")).value;
    let email = (<HTMLInputElement>form.elements.namedItem("email")).value;
    let password = (<HTMLInputElement>form.elements.namedItem("password"))
      .value;
    let country = (<HTMLInputElement>form.elements.namedItem("country")).value;
    let gender = (<HTMLInputElement>form.elements.namedItem("gender")).value;
    let phone = (<HTMLInputElement>form.elements.namedItem("phone")).value;

    let user = {
      name,
      email,
      password,
      country,
      gender,
      phone,
    };
    return user;
  }

  signup(event: Event) {
    event.preventDefault();
    let form = <HTMLFormElement>event.target;
    let user = this.readValueFromForm(form);
    this.createUser(user, form);
    this.messageService.add({
      key: "myKey1",
      severity: "success",
      summary: "alert",
      detail: "Add Student successfully",
    });
  }

  createUser(user, form: HTMLFormElement) {
    this.userService.signup(user).subscribe({
      next: (result: { message: string }) => {
        console.log(result);

        form.reset();
        this.modalService.dismissAll();
        this.listUsers();
      },
      error: (response: HttpErrorResponse) => {
        console.log(response);
      },
    });
  }

  updateStudent(updateForm: HTMLFormElement) {
    let name = (<HTMLInputElement>updateForm.elements.namedItem("name")).value;
    let email = (<HTMLInputElement>updateForm.elements.namedItem("email"))
      .value;
    let phone = (<HTMLInputElement>updateForm.elements.namedItem("phone"))
      .value;
    let country = (<HTMLInputElement>updateForm.elements.namedItem("country"))
      .value;
    let gender = (<HTMLInputElement>updateForm.elements.namedItem("gender"))
      .value;

    let values = {
      name,
      email,
      phone,
      country,
      gender,
    };

    this.userService.updateUser(values, this.selectedUser._id).subscribe({
      next: (value) => {
        this.selectedUser.name = name;
        this.selectedUser.email = email;
        this.selectedUser.phone = phone;

        this.selectedUser.country = country;
        this.selectedUser.gender = gender;

        this.modalService.dismissAll();
        this.messageService.add({
          key: "myKey2",
          severity: "success",
          summary: "alert",
          detail: "Update Student successfully",
        });
      },
      error: (error) => {},
    });
  }

  deleteStudent(id) {
    this.userService.deleteUser(id).subscribe((data) => {
      console.log("deleted response", data);
      this.listUsers();
      this.messageService.add({
        key: "myKey2",
        severity: "warn",
        summary: "alert",
        detail: "Delete Student successfully",
      });
    });
  }
}
