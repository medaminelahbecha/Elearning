import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import {Country} from '@angular-material-extensions/select-country';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/userService';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  error:string;
  success:string;
  myData: any;
  constructor(private userService : UserService ,private router : Router ,private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://trial.mobiscroll.com/content/countries.json').subscribe((resp: any) => {
      const countries = [];
      for (let i = 0; i < resp.length; ++i) {
          const country = resp[i];
          countries.push({ text: country.text, value: country.value });
      }
      this.myData = countries;
      console.log(countries)
  });
  }
  onCountrySelected($event: Country) {
    console.log($event);
  }
  navigateToLoginPage(){

    this.router.navigate(['login'])
  }
  readValueFromForm(form :HTMLFormElement){
    let name =(<HTMLInputElement>form.elements.namedItem('name')).value
    let email =(<HTMLInputElement>form.elements.namedItem('email')).value
    let password =(<HTMLInputElement>form.elements.namedItem('password')).value
    let country =(<HTMLInputElement>form.elements.namedItem('country')).value
    let gender =(<HTMLInputElement>form.elements.namedItem('gender')).value
    let phone =(<HTMLInputElement>form.elements.namedItem('phone')).value
    

    let userValue  ={
      name,
      email,
      password,
      country,
      gender,
      phone
    };
    return userValue;
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
          this.success=result.message;
          this.error=undefined;
          form.reset();
          this.navigateToLoginPage();
        },
        error :(response : HttpErrorResponse)=>{
          console.log(response);
          this.error=response.error.error.message;
          this.success=undefined;
          
          
        }
      }
    )
  }

}
