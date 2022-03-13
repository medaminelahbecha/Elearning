import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";
import { Seance } from "src/app/models/seance";
import { User } from "src/app/models/user";
import { SeanceService } from "src/app/services/seanceService";
import { UserService } from "src/app/services/userService";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Location } from "@angular/common";
import { Enseignant } from "src/app/models/enseignant";
import { EnseignantService } from "src/app/services/enseignant.service";

@Component({
  selector: "app-enseignant-details",
  templateUrl: "./enseignant-details.component.html",
  styleUrls: ["./enseignant-details.component.css"],
  providers: [MessageService],
})
export class EnseignantDetailsComponent implements OnInit {
  selectedTeacher;
  htmlContent = "";
  resume;
  isTeacher;
  isAdmin;
  constructor(
    private enseignantService: EnseignantService,
    private _location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private modalService: NgbModal
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras?.state) {
      const state = navigation.extras.state as {
        enseignant: Enseignant;
      };

      this.selectedTeacher = state.enseignant;
      console.log(this.selectedTeacher);
    } else {
      this._location.back();
    }
  }

  addHours(hoursForm: HTMLFormElement) {
    let heureDebut = (<HTMLInputElement>(
      hoursForm.elements.namedItem("startHours")
    )).value;
    let heureFin = (<HTMLInputElement>hoursForm.elements.namedItem("endHours"))
      .value;
    let values = {
      heureDebut,
      heureFin,
    };

    this.enseignantService
      .updateEnseignant(values, this.selectedTeacher._id)
      .subscribe({
        next: (value) => {
          this.selectedTeacher;
          this.messageService.add({
            key: "myKey2",
            severity: "success",
            summary: "alert",
            detail: "Business Hours update successfully",
          });
        },
        error: (error) => {},
      });
    console.log(heureDebut, heureFin);
  }
  updateEnseignant(updateForm: HTMLFormElement) {
    let name = (<HTMLInputElement>updateForm.elements.namedItem("name")).value;
    let email = (<HTMLInputElement>updateForm.elements.namedItem("email"))
      .value;
    let phone = (<HTMLInputElement>updateForm.elements.namedItem("phone"))
      .value;
    let cours = (<HTMLInputElement>updateForm.elements.namedItem("cours"))
      .value;
    let url = (<HTMLInputElement>updateForm.elements.namedItem("url")).value;

    let password = (<HTMLInputElement>updateForm.elements.namedItem("password"))
      .value;

    let values = {
      name,
      email,
      phone,
      cours,
      url,
      password,
    };

    this.enseignantService
      .updateEnseignant(values, this.selectedTeacher._id)
      .subscribe({
        next: (value) => {
          this.messageService.add({
            key: "myKey2",
            severity: "success",
            summary: "alert",
            detail: "update Teacher successfully",
          });
        },
        error: (error) => {},
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

  ngOnInit(): void {
    this.selectedTeacher;
  }
}
