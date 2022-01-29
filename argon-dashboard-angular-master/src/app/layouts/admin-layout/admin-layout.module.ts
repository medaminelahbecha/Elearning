import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { EnseignantComponent } from '../../pages/enseignant/enseignant.component';
import { SeancesComponent } from '../../pages/seances/seances.component';
import { HomeComponent } from '../../pages/home/home.component';
import { StudentsComponent } from '../../pages/students/students.component';
import { StudentListComponent } from '../../pages/teacherEspace/student-list/student-list.component';
import { StudentDetailsComponent } from '../../pages/teacherEspace/student-details/student-details.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { CalendarComponent } from '../../pages/calendar/calendar.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { TeacherProfileComponent } from '../../pages/teacherEspace/teacher-profile/teacher-profile.component';
import {ToastModule} from 'primeng/toast';
import {AccordionModule} from 'primeng/accordion';
// import { ToastrModule } from 'ngx-toastr';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgbModalModule,
    FullCalendarModule,
    ToastModule,
    
   
    
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    StudentsComponent,
    EnseignantComponent,
    SeancesComponent,
    CalendarComponent,
    StudentListComponent,
    StudentDetailsComponent,
    TeacherProfileComponent,
    HomeComponent
    
  ]
})

export class AdminLayoutModule {}
