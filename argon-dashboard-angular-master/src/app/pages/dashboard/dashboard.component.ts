import { Component, OnInit } from '@angular/core';
import { EnseignantService } from 'src/app/services/enseignant.service';
import { SeanceService } from 'src/app/services/seanceService';
import { UserService } from 'src/app/services/userService';

// core components

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

 userCount
 teacherCount
 seanceCount
  constructor(private userService: UserService , private enseignantService : EnseignantService ,private seanceService : SeanceService ) {
    
   }
  ngOnInit() {

    this.getUserCount()
    this.getTeacherCount()
    this.getSeanceCount()

    
  }
  getUserCount(){
    this.userService.getUserCount().subscribe({
    next :(users)=>{
      console.log(users)
      this.userCount = users
      console.log(this.userCount)
    }    
    }) 
  }
  getTeacherCount(){
    this.enseignantService.getTeacherCount().subscribe({
    next :(teachers)=>{
      console.log(teachers)
      this.teacherCount = teachers
      console.log(this.teacherCount)
    }   
    }) 
  }
  getSeanceCount(){
    this.seanceService.getSeancesCount().subscribe({
    next :(seances)=>{
      console.log(seances)
      this.seanceCount = seances
      console.log(this.seanceCount)
    }   
    }) 
  }

 

}
