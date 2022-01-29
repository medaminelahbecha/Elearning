import { Component, OnInit } from '@angular/core';
import { EnseignantService } from 'src/app/services/enseignant.service';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  teacher
  constructor(private enseignantService : EnseignantService) { }

  ngOnInit() {
    this.getProfile()
  }

  getProfile(){
    this.enseignantService.getProfile().subscribe({

    next :(ens)=>{
      this.teacher = ens
      console.log(this.teacher)
    }
      
    })
   
  }

}
