import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { EnseignantComponent } from "../../pages/enseignant/enseignant.component";
import { StudentsComponent } from "../../pages/students/students.component";
import { SeancesComponent } from "../../pages/seances/seances.component";
import { CalendarComponent } from "../../pages/calendar/calendar.component";
import { StudentListComponent } from "../../pages/teacherEspace/student-list/student-list.component";
import { StudentDetailsComponent } from "../../pages/teacherEspace/student-details/student-details.component";
import { TeacherProfileComponent } from "../../pages/teacherEspace/teacher-profile/teacher-profile.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { HomeComponent } from "../../pages/home/home.component";
import { TeacherCalendarComponent } from "src/app/pages/teacherEspace/teacher-calendar/teacher-calendar.component";
import { SeanceTeacherComponent } from "src/app/pages/teacherEspace/seance-teacher/seance-teacher.component";
import { CoursComponent } from "src/app/pages/cours/cours.component";
import { UserAuthGuardService } from "src/app/auth-guard/authUserService";
import { SeanceDetailComponent } from "src/app/pages/teacherEspace/seance-detail/seance-detail.component";
import { EnseignantDetailsComponent } from "src/app/pages/enseignant-details/enseignant-details.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: "dashboard",
    canActivate: [UserAuthGuardService],
    component: DashboardComponent,
  },
  {
    path: "user-profile",
    canActivate: [UserAuthGuardService],
    component: UserProfileComponent,
  },
  {
    path: "students",
    canActivate: [UserAuthGuardService],
    component: StudentsComponent,
  },
  {
    path: "seances",
    canActivate: [UserAuthGuardService],
    component: SeancesComponent,
  },
  {
    path: "calendar",
    canActivate: [UserAuthGuardService],
    component: CalendarComponent,
  },
  {
    path: "enseignant",
    canActivate: [UserAuthGuardService],
    component: EnseignantComponent,
  },
  {
    path: "teacher/list-student",
    canActivate: [UserAuthGuardService],
    component: StudentListComponent,
  },
  {
    path: "teacher/detail-student",
    canActivate: [UserAuthGuardService],
    component: StudentDetailsComponent,
  },
  {
    path: "teacher/profile",
    canActivate: [UserAuthGuardService],
    component: TeacherProfileComponent,
  },
  {
    path: "home",
    canActivate: [UserAuthGuardService],
    component: HomeComponent,
  },
  { path: "", canActivate: [UserAuthGuardService], component: HomeComponent },
  {
    path: "teacher-calendar",
    canActivate: [UserAuthGuardService],
    component: TeacherCalendarComponent,
  },
  {
    path: "teacher-seance",
    canActivate: [UserAuthGuardService],
    component: SeanceTeacherComponent,
  },
  {
    path: "teacher-details",
    canActivate: [UserAuthGuardService],
    component: EnseignantDetailsComponent,
  },
  {
    path: "cours",
    canActivate: [UserAuthGuardService],
    component: CoursComponent,
  },
  {
    path: "session-detail",
    canActivate: [UserAuthGuardService],
    component: SeanceDetailComponent,
  },
];
