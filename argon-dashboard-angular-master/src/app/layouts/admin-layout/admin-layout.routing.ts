import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { EnseignantComponent } from '../../pages/enseignant/enseignant.component';
import { StudentsComponent } from '../../pages/students/students.component';
import { SeancesComponent } from '../../pages/seances/seances.component';
import { CalendarComponent } from '../../pages/calendar/calendar.component';
import { StudentListComponent } from '../../pages/teacherEspace/student-list/student-list.component';
import { StudentDetailsComponent } from '../../pages/teacherEspace/student-details/student-details.component';
import { TeacherProfileComponent } from '../../pages/teacherEspace/teacher-profile/teacher-profile.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { HomeComponent } from '../../pages/home/home.component';



export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'students',   component: StudentsComponent },
    { path: 'seances',   component: SeancesComponent },
    { path: 'calendar',   component: CalendarComponent },
    { path: 'enseignant',         component: EnseignantComponent },
    { path: 'teacher/list-student',   component: StudentListComponent },
    { path: 'teacher/detail-student',   component: StudentDetailsComponent },
    { path: 'teacher/profile',   component: TeacherProfileComponent },
    { path: 'home',   component: HomeComponent },
   
];
