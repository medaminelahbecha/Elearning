import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import {
  NgbModalConfig,
  NgbModal,
  ModalDismissReasons,
} from "@ng-bootstrap/ng-bootstrap";
import { Enseignant } from "src/app/models/enseignant";
import { SeanceService } from "src/app/services/seanceService";
import { Seance } from "src/app/models/seance";
import { Observable, Subscription } from "rxjs";
import { EnseignantService } from "src/app/services/enseignant.service";
import { MessageService } from "primeng/api";
import { UserService } from "src/app/services/userService";
import { DatePipe } from "@angular/common";
import { Lesson } from "src/app/models/lesson";
import { Cours } from "src/app/models/cours";
import { CoursService } from "src/app/services/coursService";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";

@Component({
  selector: "app-seances",
  templateUrl: "./seances.component.html",
  styleUrls: ["./seances.component.css"],
  providers: [MessageService, DatePipe],
})
export class SeancesComponent implements OnInit {
  enseignante: any;
  enseignants: Enseignant[] = [];
  enseignantSubscription: Subscription;
  p: number = 1;
  selectedEnseignant: Enseignant;
  searchText;
  selectedSeance: Seance;
  seances: any;
  enseignant: Enseignant = new Enseignant();
  isStudent;
  isAdmin;
  date;
  dateD: Date;
  cours: Cours[] = [];
  lessons: Lesson[] = [];
  closeResult: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursService: CoursService,
    private userService: UserService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private seanceService: SeanceService,
    private enseignantService: EnseignantService,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }

  collectAllEnseignant() {
    this.enseignantSubscription = this.enseignantService
      .getEnseignants()
      .subscribe({
        next: (enseignant) => {
          this.enseignants = enseignant;
          console.log(enseignant);
        },
      });
  }
  open4(content, id) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result === "yes") {
            this.deleteSeance(id);
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
  open2(content2, sc: Seance) {
    this.selectedSeance = sc;
    this.dateD = this.selectedSeance.dateDebut;
    this.date = this.datePipe.transform(
      this.selectedSeance.dateDebut,
      "yyyy-MM-dd  h:mm"
    );
    this.modalService.open(content2);
    console.log(this.selectedSeance);
  }
  open3(seance: Seance) {
    const navigationExtras: NavigationExtras = {
      state: {
        seance: seance,
      },
      relativeTo: this.route,
    };
    this.router.navigate(["/session-detail"], navigationExtras);
  }
  ngOnInit(): void {
    this.listCours();
    this.listLesson();
    this.collectAllEnseignant();
    //this.listSeances()
    this.chekStudent();
    this.chekAdmin();
    this.userConnecte();
    console.log(this.selectedSeance);
    setTimeout(() => {
      if (this.isStudent) {
        let id = localStorage.getItem("userId") ?? "";
        return this.seanceService.getSeanceStudent(id).subscribe((seance) => {
          this.seances = seance;
        });
      } else {
        return this.seanceService.getAllSeance().subscribe((seance) => {
          this.seances = seance;
        });
      }
    }, 1000);
  }
  listCours() {
    this.coursService.getCours().subscribe({
      next: (cours) => {
        this.cours = cours;
        console.log(this.cours);
      },
    });
  }
  listLesson() {
    this.coursService.getLesson().subscribe({
      next: (lessons) => {
        this.lessons = lessons;
        console.log(this.lessons);
      },
    });
  }
  chekStudent() {
    return this.userService.isStudent().subscribe((data) => {
      this.isStudent = data;
      console.log(this.isStudent);
    });
  }
  chekAdmin() {
    return this.userService.isAdmin().subscribe((data) => {
      this.isAdmin = data;
      console.log(this.isAdmin);
    });
  }

  userConnecte() {
    return this.seanceService.getUserConnecte().subscribe((data) => {
      console.log(data);
    });
  }

  listSeances() {
    if (this.isStudent) {
      let id = localStorage.getItem("userId") ?? "";
      return this.seanceService.getSeanceStudent(id).subscribe((seance) => {
        this.seances = seance;
      });
    } else {
      return this.seanceService.getAllSeance().subscribe((seance) => {
        this.seances = seance;
      });
    }
  }

  getEnseignatById(id) {
    return this.seanceService.getEnseignantByID(id).subscribe((result) => {
      this.enseignante = result;
      console.log(this.enseignante);
    });
  }

  saveSeance(seanceForm: HTMLFormElement) {
    let name = (<HTMLInputElement>seanceForm.elements.namedItem("name")).value;
    let enseignant = (<HTMLInputElement>(
      seanceForm.elements.namedItem("enseignant")
    )).value;

    let dateDebut = (<HTMLInputElement>(
      seanceForm.elements.namedItem("dateDebut")
    )).value;
    let dateFin = (<HTMLInputElement>seanceForm.elements.namedItem("dateFin"))
      .value;
    let type = (<HTMLInputElement>seanceForm.elements.namedItem("type")).value;

    let user;
    let status = "In progress";

    this.seanceService.getUserConnecte().subscribe((data) => {
      user = data;
      console.log(user);
      let values = {
        name,
        enseignant,
        user,
        dateDebut,
        dateFin,
        type,
        status,
      };

      this.seanceService.saveSeance(values).subscribe({
        next: (seance) => {
          seanceForm.reset();
          this.listSeances();
          this.modalService.dismissAll();
          this.messageService.clear("myKey1");
          this.messageService.add({
            key: "myKey1",
            severity: "success",
            summary: "alert",
            detail: "Add Session successfully",
          });
        },
        error: (error: HttpErrorResponse) => {
          if (error.message.includes("auth Failed")) {
          }
        },
      });
    });
  }
  updateSeance(updateForm: HTMLFormElement) {
    let cours = (<HTMLInputElement>updateForm.elements.namedItem("cour")).value;
    let enseignant = (<HTMLInputElement>(
      updateForm.elements.namedItem("enseignant")
    )).value;

    let dateDebut = (<HTMLInputElement>(
      updateForm.elements.namedItem("dateDebut")
    )).value;
    let dateFin = (<HTMLInputElement>updateForm.elements.namedItem("dateFin"))
      .value;
    let lesson = (<HTMLInputElement>updateForm.elements.namedItem("lesson"))
      .value;

    let values = {
      cours,
      enseignant,
      dateDebut,
      dateFin,
      lesson,
    };

    this.seanceService.updateSeance(values, this.selectedSeance._id).subscribe({
      next: (value) => {
        this.modalService.dismissAll();
        this.listSeances();
        this.messageService.clear("myKey2");
        this.messageService.add({
          key: "myKey2",
          severity: "success",
          summary: "alert",
          detail: "Update Session successfully",
        });
      },
      error: (error) => {},
    });
  }
  updateTeacher(updateTeacherr: HTMLFormElement) {
    let enseignant = (<HTMLInputElement>(
      updateTeacherr.elements.namedItem("enseignant")
    )).value;

    let values = {
      enseignant,
    };

    this.seanceService.updateSeance(values, this.selectedSeance._id).subscribe({
      next: (value) => {
        this.modalService.dismissAll();
        this.listSeances();
        this.messageService.clear("myKey2");
        this.messageService.add({
          key: "myKey2",
          severity: "success",
          summary: "alert",
          detail: "Update Session successfully",
        });
      },
      error: (error) => {},
    });
  }

  deleteSeance(id) {
    this.seanceService.deleteSeance(id).subscribe((data) => {
      console.log("deleted response", data);
      this.listSeances();
      this.messageService.clear("myKey3");
      this.messageService.add({
        key: "myKey3",
        severity: "warn",
        summary: "alert",
        detail: "Delete Session successfully",
      });
    });
  }
}
