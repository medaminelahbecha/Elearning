import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { SeanceService } from "src/app/services/seanceService";
import { CalendarOptions, FullCalendarComponent } from "@fullcalendar/angular";
import { Seance } from "src/app/models/seance";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";

@Component({
  selector: "app-teacher-calendar",
  templateUrl: "./teacher-calendar.component.html",
  styleUrls: ["./teacher-calendar.component.css"],
})
export class TeacherCalendarComponent implements OnInit {
  @ViewChild("calendar") calendarComponent: FullCalendarComponent;
  Events = [];
  selectedSeance: Seance;
  endtHours;
  startHours;
  calendarOptions: CalendarOptions;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private seanceService: SeanceService
  ) {}

  open2() {
    const navigationExtras: NavigationExtras = {
      state: {
        seance: this.selectedSeance,
      },
      relativeTo: this.route,
    };
    this.router.navigate(["/session-detail"], navigationExtras);
  }

  getSessions() {
    setTimeout(() => {
      let id = localStorage.getItem("idTeacher") ?? "";
      return this.seanceService.getSeanceCalendarEns(id).subscribe((res) => {
        res.map((el) => {
          // console.log("ellll", el);
          el.color = "#DC143C";
          this.startHours = el.startHours;
          this.endtHours = el.endtHours;
          this.selectedSeance = el.seance;
        }),
          this.Events.push(res);
      });
    }, 1000);

    setTimeout(() => {
      this.calendarOptions = {
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        },
        businessHours: {
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // Mon,Wed,Fri
          startTime: this.startHours,
          endTime: this.endtHours,
        },
        eventClick: this.open2.bind(this),
        initialView: "dayGridMonth",

        events: this.Events[0],
      };
    }, 1500);
  }

  ngOnInit(): void {}
}
