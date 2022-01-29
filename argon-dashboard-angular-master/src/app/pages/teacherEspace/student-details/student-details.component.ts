
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Commentaire } from 'src/app/models/commentaire';
import { User } from 'src/app/models/user';
import { CommentaireService } from 'src/app/services/commentaireService';
import {MessageService} from 'primeng/api';
import { NiveauxService } from 'src/app/services/niveau';
import { Niveau } from 'src/app/models/niveau';
@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
  providers: [MessageService]
})
export class StudentDetailsComponent implements OnInit {
  enseignantId = localStorage.getItem('idTeacher') ?? ""
slectedStudent 
commentaires : Commentaire []=[]
niveaux : Niveau []=[]
  constructor(private router :Router ,private route: ActivatedRoute , private commentaireService : CommentaireService,private messageService: MessageService,private modalService: NgbModal , private niveauService : NiveauxService) { 
    const navigation = this.router.getCurrentNavigation();
        if (navigation.extras?.state) {
            const state = navigation.extras.state as {
                
                student: User
            };
            
            this.slectedStudent = state.student;
        } else {
            this.router.navigate(['/teacher/list-student'], {relativeTo: this.route});
        }

       

  }

  ngOnInit(): void {
    this.slectedStudent
    this.findCommentaire()
    this.findNiveau()
    
    console.log(this.slectedStudent._id)
    console.log(this.checkNiveau())
  }

  open(content) {
     
    this.modalService.open(content);
  }
  findCommentaire(){
    
    return this.commentaireService.getCommenatires(this.slectedStudent._id)
    .subscribe( 
      data =>{ 
        console.log(data)
        this.commentaires =data 
      }
    )
   
  }
  findNiveau(){
    
    return this.niveauService.getNiveau(this.slectedStudent._id)
    .subscribe( 
      data =>{ 
        console.log(data)
        this.niveaux =data 
      }
    )
   
  }
 


  addCommentaire(commentaireForm : HTMLFormElement){
    let description =(<HTMLInputElement>commentaireForm.elements.namedItem('description')).value
   let myDate = new Date();
    let id = localStorage.getItem('idTeacher') ?? ""
      let values = {
        description ,enseignant : id, user: this.slectedStudent, date : myDate
      }
    this.commentaireService.saveCommentaire(values)
    .subscribe({
      
      next : (com)=>{
        commentaireForm.reset()
        this.findCommentaire()
        this.messageService.add({key: 'myKey1', severity:'success', summary: 'Summary Text', detail: 'Detail Text'});
      },
      error :(error : HttpErrorResponse)=>{
        if(error.message.includes('auth Failed')){
 
        }
         
       }

    })
    
    
  }

  deleteCommentaire(id){
    this.commentaireService.deleteCommentaire(id).subscribe(
      data =>{
        console.log('deleted response',data);
        this.findCommentaire();
      }
    )
   
  }

   checkNiveau(){
    for (var i=0; i < this.niveaux.length; i++) {
        if (this.niveaux[i].user._id === this.slectedStudent._id) {
            return false;
        }
    }
  return true;
}
  addNiveau(niveauForm : HTMLFormElement){
    let listening =(<HTMLInputElement>niveauForm.elements.namedItem('listening')).value
    let reading =(<HTMLInputElement>niveauForm.elements.namedItem('reading')).value
    let interraction =(<HTMLInputElement>niveauForm.elements.namedItem('interraction')).value
    let production =(<HTMLInputElement>niveauForm.elements.namedItem('production')).value
    let writing =(<HTMLInputElement>niveauForm.elements.namedItem('writing')).value
    
   
   
      let values = {
        listening ,reading , interraction, production, writing, user: this.slectedStudent
      }
    this.niveauService.saveNiveau(values)
    .subscribe({
      
      next : (com)=>{
        niveauForm.reset()
        this.findNiveau()
        this.messageService.add({key: 'myKey1', severity:'success', summary: 'Summary Text', detail: 'Detail Text'});
      },
      error :(error : HttpErrorResponse)=>{
        if(error.message.includes('auth Failed')){
 
        }
         
       }

    })
    
    
  }

}
