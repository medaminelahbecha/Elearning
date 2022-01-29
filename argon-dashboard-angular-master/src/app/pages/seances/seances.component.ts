import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Enseignant } from 'src/app/models/enseignant';
import { SeanceService } from 'src/app/services/seanceService';
import { Seance } from 'src/app/models/seance';
import { Observable, Subscription } from 'rxjs';
import { EnseignantService } from 'src/app/services/enseignant.service';

@Component({
  selector: 'app-seances',
  templateUrl: './seances.component.html',
  styleUrls: ['./seances.component.css']
})
export class SeancesComponent implements OnInit {
  enseignante : any
  enseignants : Enseignant []=[]
  enseignantSubscription : Subscription 
  p: number = 1;
  selectedEnseignant: Enseignant
  searchText
  selectedSeance : Seance
  seances: any;
  enseignant : Enseignant =new Enseignant();
  constructor(config: NgbModalConfig, private modalService: NgbModal ,private seanceService: SeanceService,private enseignantService: EnseignantService ) {
    config.backdrop = 'static';
    config.keyboard = false;
    
   }

   collectAllEnseignant(){
    this.enseignantSubscription=this.enseignantService.getEnseignants()
    .subscribe({
      next: (enseignant) => {
        this.enseignants = enseignant
        console.log(enseignant)
      }
     
    })
  }

   open(content) {
     
    this.modalService.open(content);
  }
  open2(content2, sc : Seance) {
    this.selectedSeance = sc
    this.modalService.open(content2);
  }
  ngOnInit(): void {
   this.collectAllEnseignant()
    this.listSeances()
    
    this.userConnecte()
  }

  
  userConnecte(){
    return this.seanceService.getUserConnecte().subscribe(data=>{
      console.log(data)
    })
  }

  listSeances(){
    console.log("aaaaaaaaaaaa")
    return this.seanceService.getAllSeance().subscribe(
      
      seance =>{ this.seances =seance
      
      }
    )
   
  }

  getEnseignatById(id){
    
    return this.seanceService.getEnseignantByID(id).subscribe(
      
      result =>{
        this.enseignante= result
        console.log(this.enseignante)
      
      }
    )
   
  }
  
  saveSeance(seanceForm : HTMLFormElement){
    let name =(<HTMLInputElement>seanceForm.elements.namedItem('name')).value
    let enseignant =(<HTMLInputElement>seanceForm.elements.namedItem('enseignant')).value
    
    let dateDebut =(<HTMLInputElement>seanceForm.elements.namedItem('dateDebut')).value
    let dateFin =(<HTMLInputElement>seanceForm.elements.namedItem('dateFin')).value
    let type =(<HTMLInputElement>seanceForm.elements.namedItem('type')).value
    let user
    console.log((dateDebut))
    console.log((dateFin))
    
    this.seanceService.getUserConnecte().subscribe(data=>{
      user=data
      console.log(user)
      let values = {
        name ,enseignant,user,dateDebut , dateFin ,type 
      }
    
    
    this.seanceService.saveSeance(values)
    .subscribe({
      
      next : (seance)=>{
        
        seanceForm.reset()
        this.modalService.dismissAll()
        
      },
      error :(error : HttpErrorResponse)=>{
        if(error.message.includes('auth Failed')){
 
        }
         
       }

    })
  })  
    
  }
  updateSeance(updateForm: HTMLFormElement) {
    let name =(<HTMLInputElement>updateForm.elements.namedItem('name')).value
    let enseignant =(<HTMLInputElement>updateForm.elements.namedItem('enseignant')).value
    
    let dateDebut =(<HTMLInputElement>updateForm.elements.namedItem('dateDebut')).value
    let dateFin =(<HTMLInputElement>updateForm.elements.namedItem('dateFin')).value
    let type =(<HTMLInputElement>updateForm.elements.namedItem('type')).value

    let values = {
      name ,enseignant, dateDebut,dateFin , type 
    }

    this.seanceService.updateSeance(values, this.selectedSeance._id)
      .subscribe({
        next: (value) => {
          
         this.modalService.dismissAll()
         this.listSeances()
        },
        error: (error) => {

        }

      })

  }

  deleteSeance(id){
    this.seanceService.deleteSeance(id).subscribe(
      data =>{
        console.log('deleted response',data);
        this.listSeances();
      }
    )
   
  }
  
  
 

  

  

}
