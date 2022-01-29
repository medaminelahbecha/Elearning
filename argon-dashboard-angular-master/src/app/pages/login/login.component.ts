import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/userService';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form : HTMLFormElement;
 error :string ;
 success:string;
  returnUrl: string;
  constructor(private userService : UserService,
    private route : ActivatedRoute,
    private router : Router) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params : ParamMap)=>{
      this.returnUrl = params.get('returnUrl')
    })
  }
  ngOnDestroy() {
  }

  login(event : Event){
    event.preventDefault();
    this.form=<HTMLFormElement>event.target
    this.readFormValues();
  }

  navigateToHomePage(){
    let url = this.returnUrl ? this.returnUrl  : '/';
    this.router.navigateByUrl(url)

  }

  navigateToLoginEnsPage(){
    let url = this.returnUrl ? this.returnUrl  : '/loginEnseignant';
    this.router.navigateByUrl(url)

  }

  readFormValues(){
    let email = (<HTMLFormElement>this.form.elements.namedItem('email')).value
    let password = (<HTMLFormElement>this.form.elements.namedItem('password')).value;
    let creadentials = {
      email , password
    }
 
    console.log(creadentials);
    this.userService.login(creadentials)
    .subscribe({
      next :(result )=>{
        console.log(result);
        this.success=result.message
        this.error=undefined
        this.navigateToHomePage();
      },
      error :(response : HttpErrorResponse)=>{
        console.log(response.error);
        this.success=undefined
        this.error=response.error.error.message
      }
    })
    
    }

}
