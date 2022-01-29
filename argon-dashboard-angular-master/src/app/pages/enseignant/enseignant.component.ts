import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Enseignant } from 'src/app/models/enseignant';
import { EnseignantService } from 'src/app/services/enseignant.service';




@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.css']
})

export class EnseignantComponent implements OnInit {
  p: number = 1;
  selectedEnseignant: Enseignant
  searchText
  enseignants: Enseignant[]=[];
  enseignant : Enseignant =new Enseignant();
  constructor(config: NgbModalConfig, private modalService: NgbModal ,private enseignantService: EnseignantService ) {
    config.backdrop = 'static';
    config.keyboard = false;
    
   }
   
   open(content) {
     
    this.modalService.open(content);
  }
  open2(content2, ens : Enseignant) {
    this.selectedEnseignant = ens
    this.modalService.open(content2);
  }
  ngOnInit(): void {
   // 
    this.listEnseignants()
    this.enseignants
  }

  listEnseignants(){
    this.enseignantService.getEnseignants().subscribe({

    next :(enseignants)=>{
      this.enseignants = enseignants
    }
      
    })
   
  }
  

  
   saveEnseignant(enseignantForm : HTMLFormElement){
    let name =(<HTMLInputElement>enseignantForm.elements.namedItem('name')).value
    let email =(<HTMLInputElement>enseignantForm.elements.namedItem('email')).value
    let phone =(<HTMLInputElement>enseignantForm.elements.namedItem('phone')).value
    let matter =(<HTMLInputElement>enseignantForm.elements.namedItem('matter')).value
    let password =(<HTMLInputElement>enseignantForm.elements.namedItem('password')).value
    
    
    let values = {
      name ,email, phone,matter , password 
    }

    
    this.enseignantService.saveEnseignant(values)
    .subscribe({
      next : (enseigant)=>{
        
        enseignantForm.reset()
        this.modalService.dismissAll()
        this.listEnseignants();
      },
      error :(error : HttpErrorResponse)=>{
        if(error.message.includes('auth Failed')){
 
        }
         
       }

    })

    console.log(values);
    
  }
   
  
  
  updateEnseignant(updateForm: HTMLFormElement) {
    let name =(<HTMLInputElement>updateForm.elements.namedItem('name')).value
    let email =(<HTMLInputElement>updateForm.elements.namedItem('email')).value
    let phone =(<HTMLInputElement>updateForm.elements.namedItem('phone')).value
    let matter =(<HTMLInputElement>updateForm.elements.namedItem('matter')).value
    let password =(<HTMLInputElement>updateForm.elements.namedItem('password')).value

    let values = {
      name ,email, phone,matter , password 
    }

    this.enseignantService.updateEnseignant(values, this.selectedEnseignant._id)
      .subscribe({
        next: (value) => {
          this.selectedEnseignant.name = name
          this.selectedEnseignant.email = email
          this.selectedEnseignant.phone = phone
          this.selectedEnseignant.matter = matter
          this.selectedEnseignant.password = password
         this.modalService.dismissAll()
        },
        error: (error) => {

        }

      })

  }

  getEnseignantById(id){
    
      
      this.enseignantService.getEnseignantById(id).subscribe(
        data => {
          this.enseignant =data 
          console.log('response' , this.enseignant)
          this.listEnseignants()
        }
        
      )  
  }

  deleteEnseignant(id){
    this.enseignantService.deleteEnseignant(id).subscribe(
      data =>{
        console.log('deleted response',data);
        this.listEnseignants();
      }
    )
   
  }

}
