import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Commentaire } from "src/app/models/commentaire";
import { User } from "src/app/models/user";
import { CommentaireService } from "src/app/services/commentaireService";
import { MessageService } from "primeng/api";
import { NiveauxService } from "src/app/services/niveau";
import { Niveau } from "src/app/models/niveau";
import { UserService } from "src/app/services/userService";
import { Location } from "@angular/common";
@Component({
  selector: "app-student-details",
  templateUrl: "./student-details.component.html",
  styleUrls: ["./student-details.component.css"],
  providers: [MessageService],
})
export class StudentDetailsComponent implements OnInit {
  enseignantId = localStorage.getItem("idTeacher") ?? "";
  slectedStudent;
  commentaires: Commentaire[] = [];
  niveaux: Niveau[] = [];
  selectedNiveau: Niveau;
  isTeacher;
  isAdmin;
  constructor(
    private _location: Location,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private commentaireService: CommentaireService,
    private messageService: MessageService,
    private modalService: NgbModal,
    private niveauService: NiveauxService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras?.state) {
      const state = navigation.extras.state as {
        student: User;
      };

      this.slectedStudent = state.student;
    } else {
      this._location.back();
    }
  }

  ngOnInit(): void {
    this.slectedStudent;
    this.findCommentaire();
    this.findNiveau();
    this.chekTeacher();
    this.chekAdmin();
    this.isTeacher;
    console.log(this.slectedStudent._id);
    console.log(this.checkNiveau());
  }
  chekAdmin() {
    return this.userService.isAdmin().subscribe((data) => {
      this.isAdmin = data;
      console.log(this.isAdmin);
    });
  }
  open2(content2, niv: Niveau) {
    this.selectedNiveau = niv;
    this.modalService.open(content2);
  }
  open(content) {
    this.modalService.open(content);
  }
  chekTeacher() {
    return this.userService.isTeacher().subscribe((data) => {
      this.isTeacher = data;
      console.log(this.isTeacher);
    });
  }
  findCommentaire() {
    return this.commentaireService
      .getCommenatires(this.slectedStudent._id)
      .subscribe((data) => {
        console.log(data);
        this.commentaires = data;
      });
  }
  findNiveau() {
    return this.niveauService
      .getNiveau(this.slectedStudent._id)
      .subscribe((data) => {
        console.log(data);
        this.niveaux = data;
      });
  }

  addCommentaire(commentaireForm: HTMLFormElement) {
    let description = (<HTMLInputElement>(
      commentaireForm.elements.namedItem("description")
    )).value;
    let myDate = new Date();
    let id = localStorage.getItem("idTeacher") ?? "";
    let values = {
      description,
      enseignant: id,
      user: this.slectedStudent,
      date: myDate,
    };
    this.commentaireService.saveCommentaire(values).subscribe({
      next: (com) => {
        commentaireForm.reset();
        this.findCommentaire();
        this.messageService.add({
          key: "myKey1",
          severity: "success",
          summary: "alert",
          detail: "add comment successfully",
        });
      },
      error: (error: HttpErrorResponse) => {
        if (error.message.includes("auth Failed")) {
        }
      },
    });
  }

  deleteCommentaire(id) {
    this.commentaireService.deleteCommentaire(id).subscribe((data) => {
      console.log("deleted response", data);
      this.findCommentaire();
      this.messageService.add({
        key: "myKey2",
        severity: "warn",
        summary: "alert",
        detail: "delete comment successfully",
      });
    });
  }

  checkNiveau() {
    for (var i = 0; i < this.niveaux.length; i++) {
      if (this.niveaux[i].user._id === this.slectedStudent._id) {
        return false;
      }
    }
    return true;
  }
  addNiveau(niveauForm: HTMLFormElement) {
    let listening = (<HTMLInputElement>(
      niveauForm.elements.namedItem("listening")
    )).value;
    let reading = (<HTMLInputElement>niveauForm.elements.namedItem("reading"))
      .value;
    let interraction = (<HTMLInputElement>(
      niveauForm.elements.namedItem("interraction")
    )).value;
    let production = (<HTMLInputElement>(
      niveauForm.elements.namedItem("production")
    )).value;
    let writing = (<HTMLInputElement>niveauForm.elements.namedItem("writing"))
      .value;

    let values = {
      listening,
      reading,
      interraction,
      production,
      writing,
      user: this.slectedStudent,
    };
    this.niveauService.saveNiveau(values).subscribe({
      next: (com) => {
        niveauForm.reset();
        this.findNiveau();
        this.messageService.add({
          key: "myKey3",
          severity: "info",
          summary: "alert",
          detail: "add level successfully",
        });
      },
      error: (error: HttpErrorResponse) => {
        if (error.message.includes("auth Failed")) {
        }
      },
    });
  }

  updateNiveau(updateForm: HTMLFormElement) {
    let listening = (<HTMLInputElement>(
      updateForm.elements.namedItem("listening")
    )).value;
    let reading = (<HTMLInputElement>updateForm.elements.namedItem("reading"))
      .value;
    let interraction = (<HTMLInputElement>(
      updateForm.elements.namedItem("interraction")
    )).value;
    let production = (<HTMLInputElement>(
      updateForm.elements.namedItem("production")
    )).value;
    let writing = (<HTMLInputElement>updateForm.elements.namedItem("writing"))
      .value;

    let values = {
      listening,
      reading,
      interraction,
      production,
      writing,
    };

    this.niveauService.updateNiveau(values, this.selectedNiveau._id).subscribe({
      next: (value) => {
        this.selectedNiveau.listening = listening;
        this.selectedNiveau.reading = reading;
        this.selectedNiveau.interraction = interraction;
        this.selectedNiveau.production = production;
        this.selectedNiveau.writing = writing;
        this.modalService.dismissAll();
        this.messageService.add({
          key: "myKey2",
          severity: "success",
          summary: "alert",
          detail: "update Level successfully",
        });
      },
      error: (error) => {},
    });
  }
}
