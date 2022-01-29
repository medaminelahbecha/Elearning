import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user
  constructor(private userService : UserService) { }

  ngOnInit() {
    this.getProfile()
  }

  getProfile(){
    this.userService.getProfile().subscribe({

    next :(users)=>{
      this.user = users
      console.log(this.user)
    }
      
    })
   
  }

}
