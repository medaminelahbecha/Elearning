import { Component, OnInit, ViewChild} from '@angular/core';
import { CalendarOptions,FullCalendarComponent } from '@fullcalendar/angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { SeanceService } from 'src/app/services/seanceService';

@Component({
  selector: 'app-calendar-teacher',
  templateUrl: './calendar-teacher.component.html',
  styleUrls: ['./calendar-teacher.component.css']
})
export class CalendarTeacherComponent implements OnInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent
  Events = [];
  
  calendarOptions: CalendarOptions;
  constructor( private httpClient: HttpClient , private seanceService : SeanceService ) {}
  onDateClick(res) {
    alert('Clicked on date : ' + res.dateStr)
  }
 
  ngOnInit(): void {
    setTimeout(() => {
      let id = localStorage.getItem('idTeacher') ?? "";
      return this.seanceService.getSeanceCalendarEns(id)
        .subscribe(res => {
         
            this.Events.push(res);
           
        });
    }, 2200);

    setTimeout(() => {
      this.calendarOptions = {
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        initialView: 'dayGridMonth',
        dateClick: this.onDateClick.bind(this),
        events: this.Events[0],
      };
    }, 2500);

   
    }
    
    

}
