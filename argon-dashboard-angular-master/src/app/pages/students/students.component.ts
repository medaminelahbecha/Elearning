import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/userService';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  myData: any[];

  constructor(private userService : UserService ,config: NgbModalConfig, private modalService: NgbModal,private http: HttpClient) { 
    config.backdrop = 'static';
   config.keyboard = false;
  }
  p: number = 1;
  searchText
  selectedUser: User
  users  : User[]=[]
  ngOnInit(): void {
    // 
    this.http.get('https://trial.mobiscroll.com/content/countries.json').subscribe((resp: any) => {
      const countries = [];
      for (let i = 0; i < resp.length; ++i) {
          const country = resp[i];
          countries.push({ text: country.text, value: country.value });
      }
      this.myData = countries;
      console.log(countries)
  });
     this.listUsers()
     this.users
     
   }

   
  
  open(content) {
    
   this.modalService.open(content);
 }
 open2(content2, user : User) {
   this.selectedUser = user
   this.modalService.open(content2);
 }
 
 listUsers(){
  this.userService.getAllUsers().subscribe((response)=>{
      this.users =response
      console.log(this.users)
  })
 
}

   

   readValueFromForm(form :HTMLFormElement){
    let name =(<HTMLInputElement>form.elements.namedItem('name')).value
    let email =(<HTMLInputElement>form.elements.namedItem('email')).value
    let password =(<HTMLInputElement>form.elements.namedItem('password')).value
    let country =(<HTMLInputElement>form.elements.namedItem('country')).value
    let gender =(<HTMLInputElement>form.elements.namedItem('gender')).value
    let phone =(<HTMLInputElement>form.elements.namedItem('phone')).value
    

    let user  ={
      name,
      email,
      password,
      country,
      gender,
      phone, 
     
    };
    return user;
  }

  signup(event : Event){
    event.preventDefault();
    let form =<HTMLFormElement>event.target;
    let user=this.readValueFromForm(form);
    this.createUser(user,form)
    

    
  }

  createUser(user ,form:HTMLFormElement){
    this.userService.signup(user).subscribe(
      {
        next:(result :{message:string})=>{
          console.log(result);
          
          form.reset();
          this.modalService.dismissAll()
          this.listUsers();
        },
        error :(response : HttpErrorResponse)=>{
          console.log(response);
         
          
          
        }
      }
    )
  }

  updateStudent(updateForm: HTMLFormElement) {
    let name =(<HTMLInputElement>updateForm.elements.namedItem('name')).value
    let email =(<HTMLInputElement>updateForm.elements.namedItem('email')).value
    let phone =(<HTMLInputElement>updateForm.elements.namedItem('phone')).value
    let niveau =(<HTMLInputElement>updateForm.elements.namedItem('niveau')).value
    let country =(<HTMLInputElement>updateForm.elements.namedItem('country')).value
    let gender =(<HTMLInputElement>updateForm.elements.namedItem('gender')).value
    

    let values = {
      name ,email, phone,niveau , country ,gender 
    }

    this.userService.updateUser(values, this.selectedUser._id)
      .subscribe({
        next: (value) => {
          this.selectedUser.name = name
          this.selectedUser.email = email
          this.selectedUser.phone = phone
          this.selectedUser.niveau = niveau
          this.selectedUser.country = country
          this.selectedUser.gender = gender
          
         this.modalService.dismissAll()
        },
        error: (error) => {

        }

      })

  }

  deleteStudent(id){
    this.userService.deleteUser(id).subscribe(
      data =>{
        console.log('deleted response',data);
        this.listUsers();
      }
    )
   
  }


}
