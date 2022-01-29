import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
   
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: ''  },
    { path: '/enseignant', title: 'Enseignants',  icon: 'ni-briefcase-24 text-red', class: '' },
    { path: '/students', title: 'Students',  icon: 'ni-briefcase-24 text-red', class: '' },
    { path: '/seances', title: 'Sessions',  icon: 'ni-briefcase-24 text-red', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: ''  },
    { path: '/calendar', title: 'Calendar',  icon:'ni-single-02 text-yellow', class: ''  },   
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: ''  }
];
export const TEACHERROUTES: RouteInfo[] = [
   
   
    { path: '/teacher/list-student', title: 'Students',  icon: 'ni-briefcase-24 text-red', class: '' },
    { path: '/teacher/profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: ''  },
    { path: '/calendar', title: 'Calendar',  icon:'ni-single-02 text-yellow', class: ''  },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: ''  }
];
export const STUDENTSROUTES: RouteInfo[] = [
    
    
    { path: '/seances', title: 'Sessions',  icon: 'ni-briefcase-24 text-red', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: ''  },
    { path: '/calendar', title: 'Calendar',  icon:'ni-single-02 text-yellow', class: ''  },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: ''  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isAdmin
  isStudent
  isTeacher
  public menuItemsAdmin: any[];
  public menuItemsStudent: any[];
  public menuItemsTeacher: any[];
  public isCollapsed = true;

  constructor(private router: Router ,private userService :UserService ) { }

  ngOnInit() {
    this.menuItemsAdmin = ROUTES.filter(menuItemsAdmin => menuItemsAdmin);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
     
   });
    this.menuItemsStudent = STUDENTSROUTES.filter(menuItemsStudent => menuItemsStudent);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true; 
   });
   
    this.menuItemsTeacher = TEACHERROUTES.filter(menuItemsTeacher =>menuItemsTeacher);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true; 
   });
   
   
   this.chekAdmin()
   this.chekStudent()
   this.chekTeacher()
   
  }

  chekAdmin(){
    return this.userService.isAdmin().subscribe(
      data=> {this.isAdmin=data
      console.log(this.isAdmin)
    }
    )
      
   }
  chekStudent(){
    return this.userService.isStudent().subscribe(
      data=> {this.isStudent=data
      console.log(this.isStudent)
    }
    )
  }
  chekTeacher(){
    return this.userService.isTeacher().subscribe(
      data=> {this.isTeacher=data
      console.log(this.isTeacher)
    }
    )
  }
}
