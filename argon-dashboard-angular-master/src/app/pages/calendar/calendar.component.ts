
import { Component, OnInit, ViewChild} from '@angular/core';
import { CalendarOptions,FullCalendarComponent } from '@fullcalendar/angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { SeanceService } from 'src/app/services/seanceService';


import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
 
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent
  Events = [];
  
  calendarOptions: CalendarOptions;
  constructor( private httpClient: HttpClient , private seanceService : SeanceService ) {}
  onDateClick(res) {
    alert('Clicked on date : ' + res.dateStr)
  }
 
  ngOnInit(): void {
    setTimeout(() => {
      
      return this.seanceService.getAllSeanceCalendar()
        .subscribe(res => {
            this.Events.push(res);
            console.log("aaaaaaaaa")
            console.log(this.Events);
            console.log("bbbbbbbbb")
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

   

  
  

 

  

 

 

  




