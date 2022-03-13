import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";
import { Subscription } from "rxjs";
import { Cours } from "src/app/models/cours";
import { Lesson } from "src/app/models/lesson";
import { CoursService } from "src/app/services/coursService";

@Component({
  selector: "app-cours",
  templateUrl: "./cours.component.html",
  styleUrls: ["./cours.component.css"],
  providers: [MessageService],
})
export class CoursComponent implements OnInit {
  closeResult: string;
  cours: Cours[] = [];
  coursSubscription: Subscription;
  lesson: Lesson[] = [];
  p: number = 1;
  constructor(
    private modaleService: NgbModal,
    private coursService: CoursService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.listCours();
    this.listLesson();
  }

  open4(content, id) {
    this.modaleService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result === "yes") {
            this.deleteLesson(id);
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

  listCours() {
    this.coursSubscription = this.coursService.getCours().subscribe({
      next: (cours) => {
        this.cours = cours;
        console.log(this.cours);
      },
    });
  }
  listLesson() {
    this.coursService.getLesson().subscribe({
      next: (lessons) => {
        this.lesson = lessons;
        console.log(this.lesson);
      },
    });
  }

  addCours(coursForm: HTMLFormElement) {
    let name = (<HTMLInputElement>coursForm.elements.namedItem("name")).value;

    let values = {
      name,
    };
    this.coursService.saveCours(values).subscribe({
      next: (com) => {
        coursForm.reset();
        this.cours.push(com);
        this.messageService.add({
          key: "myKey1",
          severity: "success",
          summary: "alert",
          detail: "add Cours successfully",
        });
      },
      error: (error: HttpErrorResponse) => {
        if (error.message.includes("auth Failed")) {
        }
      },
    });
  }
  addLesson(lessonForm: HTMLFormElement) {
    let name = (<HTMLInputElement>lessonForm.elements.namedItem("name")).value;
    let cours = (<HTMLInputElement>lessonForm.elements.namedItem("cours"))
      .value;

    let values = {
      name,
      cours,
    };
    this.coursService.saveLesson(values).subscribe({
      next: (com) => {
        lessonForm.reset();
        this.listLesson();
        this.messageService.add({
          key: "myKey1",
          severity: "success",
          summary: "alert",
          detail: "add Lesson successfully",
        });
      },
      error: (error: HttpErrorResponse) => {
        if (error.message.includes("auth Failed")) {
        }
      },
    });
  }
  deleteLesson(id) {
    this.coursService.deleteLesson(id).subscribe((data) => {
      console.log("deleted response", data);
      this.listLesson();
      this.messageService.clear("myKey3");
      this.messageService.add({
        key: "myKey3",
        severity: "warn",
        summary: "alert",
        detail: "Delete Lesson successfully",
      });
    });
  }

  ngOnDestroy() {
    this.coursSubscription.unsubscribe();
  }
}
