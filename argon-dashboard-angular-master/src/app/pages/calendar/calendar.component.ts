import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { CalendarOptions, FullCalendarComponent } from "@fullcalendar/angular";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { SeanceService } from "src/app/services/seanceService";
import {
  NgbModalConfig,
  NgbModal,
  ModalDismissReasons,
} from "@ng-bootstrap/ng-bootstrap";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DatePipe } from "@angular/common";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { UserService } from "src/app/services/userService";
import { EnseignantService } from "src/app/services/enseignant.service";
import { MessageService } from "primeng/api";
import { Enseignant } from "src/app/models/enseignant";
import { Subscription } from "rxjs";
import { Cours } from "src/app/models/cours";
import { Lesson } from "src/app/models/lesson";
import { CoursService } from "src/app/services/coursService";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",

  styleUrls: ["./calendar.component.css"],
  providers: [MessageService, DatePipe],
})
export class CalendarComponent implements OnInit {
  @ViewChild("calendar") calendarComponent: FullCalendarComponent;
  Events = [];
  enseignant;
  enseignants: Enseignant[] = [];
  enseignantSubscription: Subscription;
  teacher = "";
  calendarOptions: CalendarOptions;
  isStudent;
  calendarResponse;
  cours: Cours[] = [];
  lessons: Lesson[] = [];
  closeResult: string;

  constructor(
    private coursService: CoursService,
    private enseignantService: EnseignantService,
    private messageService: MessageService,
    private httpClient: HttpClient,
    private seanceService: SeanceService,
    config: NgbModalConfig,
    private userService: UserService,
    private modalService: NgbModal
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }
  isAdmin;
  endtHours;
  startHours;
  @ViewChild("content") content: ElementRef;
  @ViewChild("content4") content4: ElementRef;
  onDateClick(res) {
    if (this.isStudent) {
      let endDate = new Date(res.endStr);
      let startDate = new Date(res.startStr);
      let Time = endDate.getTime() - startDate.getTime();
      let minute = Time / (1000 * 60);

      if (minute > 30) {
        this.modalService
          .open(this.content4, { ariaLabelledBy: "modal-basic-title" })
          .result.then(
            (result) => {
              this.closeResult = `Closed with: ${result}`;
            },
            (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
          );
      } else {
        this.modalService.open(this.content);

        this.calendarResponse = res;
      }
    }
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

  eventClick(info) {
    alert("Event: " + info.event.title);
  }

  chekStudent() {
    return this.userService.isStudent().subscribe((data) => {
      this.isStudent = data;
    });
  }
  chekAdmin() {
    return this.userService.isAdmin().subscribe((data) => {
      this.isAdmin = data;
      console.log(this.isAdmin);
    });
  }
  listCours() {
    this.coursService.getCours().subscribe({
      next: (cours) => {
        this.cours = cours;
      },
    });
  }
  listLesson() {
    this.coursService.getLesson().subscribe({
      next: (lessons) => {
        this.lessons = lessons;
      },
    });
  }
  getProfile(id) {
    this.enseignantService.getOneEnseignant(id).subscribe({
      next: (ens) => {
        this.enseignant = ens;
        console.log(this.enseignant);
      },
    });
  }
  collectAllEnseignant() {
    this.enseignantSubscription = this.enseignantService
      .getEnseignants()
      .subscribe({
        next: (enseignant) => {
          this.enseignants = enseignant;
        },
      });
  }
  getAllSessions() {
    setTimeout(() => {
      return this.seanceService.getAllSeanceCalendar().subscribe((res) => {
        this.Events = res;
        console.log(this.Events);
      });
    }, 1000);

    setTimeout(() => {
      this.calendarOptions = {
        // timeZone: 'UTC+1',
        slotLabelFormat: {
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          hour12: false,
        },
        businessHours: {
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // Mon,Wed,Fri
          startTime: "06:00",
          endTime: "23:00",
        },
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        },
        eventTimeFormat: { hour: "2-digit", minute: "2-digit", hour12: false },
        events: this.Events,
        eventClick: function (arg) {
          console.log(arg);
        },
      };
    }, 1500);
  }
  getStudentSessions() {
    setTimeout(() => {
      let id = localStorage.getItem("userId") ?? "";
      return this.seanceService.getSeanceCalendarStu(id).subscribe((res) => {
        this.Events = res;
        console.log(this.Events);
      });
    }, 1000);

    setTimeout(() => {
      this.calendarOptions = {
        // timeZone: 'UTC+1',
        slotLabelFormat: {
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          hour12: false,
        },
        businessHours: {
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // Mon,Wed,Fri
          startTime: "06:00",
          endTime: "23:00",
        },
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        },
        eventTimeFormat: { hour: "2-digit", minute: "2-digit", hour12: false },
        events: this.Events,
        eventClick: function (arg) {
          console.log(arg);
        },
      };
    }, 1500);
  }
  getTeacher(teacherForm: HTMLFormElement) {
    let enseignant = (<HTMLInputElement>(
      teacherForm.elements.namedItem("enseignant")
    )).value;
    this.teacher = enseignant;
    this.getProfile(enseignant);
    setTimeout(() => {
      return this.seanceService
        .getSeanceCalendarEns(enseignant)
        .subscribe((res) => {
          console.log("aaaaaaaa", res);
          res.map((el) => {
            el.url = "";
            el.title = "";
            this.startHours = el.startHours;
            this.endtHours = el.endtHours;
          });
          this.Events = res;

          console.log(this.Events);
          console.log(this.endtHours);
        });
    }, 1000);

    setTimeout(() => {
      this.calendarOptions = {
        selectable: true,
        // timeZone: 'UTC+1',
        slotLabelFormat: {
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          hour12: false,
        },
        businessHours: {
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // Mon,Wed,Fri
          startTime: this.startHours,
          endTime: this.endtHours,
        },
        selectConstraint: "businessHours",

        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        },
        initialView: "dayGridMonth",
        //dateClick: this.onDateClick.bind(this),
        select: this.onDateClick.bind(this),
        eventTimeFormat: { hour: "2-digit", minute: "2-digit", hour12: false },
        events: this.Events,
      };
    }, 1500);
  }
  saveSeance(seanceForm: HTMLFormElement) {
    let cours = (<HTMLInputElement>seanceForm.elements.namedItem("cour")).value;
    let enseignant;

    let dateDebut = this.calendarResponse.startStr;
    let dateFin = this.calendarResponse.endStr;
    let lesson = (<HTMLInputElement>seanceForm.elements.namedItem("lesson"))
      .value;

    let user;

    this.seanceService.getUserConnecte().subscribe((data) => {
      user = data;

      let values = {
        cours,
        enseignant: this.teacher,
        user,
        dateDebut,
        dateFin,
        lesson,
      };

      this.seanceService.saveSeance(values).subscribe({
        next: (seance) => {
          seanceForm.reset();
          this.Events;
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
  ngOnInit(): void {
    this.teacher;
    this.listCours();
    this.listLesson();
    this.collectAllEnseignant();
    this.chekStudent();
    this.chekAdmin();
  }
}
