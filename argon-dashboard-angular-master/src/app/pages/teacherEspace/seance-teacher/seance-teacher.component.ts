import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";
import { Subscription } from "rxjs";
import { Enseignant } from "src/app/models/enseignant";
import { Seance } from "src/app/models/seance";
import { EnseignantService } from "src/app/services/enseignant.service";
import { SeanceService } from "src/app/services/seanceService";

@Component({
  selector: "app-seance-teacher",
  templateUrl: "./seance-teacher.component.html",
  styleUrls: ["./seance-teacher.component.css"],
  providers: [MessageService],
})
export class SeanceTeacherComponent implements OnInit {
  enseignante: any;
  enseignants: Enseignant[] = [];
  enseignantSubscription: Subscription;
  p: number = 1;
  selectedEnseignant: Enseignant;
  searchText;
  selectedSeance: Seance;
  seances: any;
  enseignant: Enseignant = new Enseignant();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private seanceService: SeanceService,
    private enseignantService: EnseignantService,
    private messageService: MessageService
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }
  open2(seance: Seance) {
    const navigationExtras: NavigationExtras = {
      state: {
        seance: seance,
      },
      relativeTo: this.route,
    };
    this.router.navigate(["/session-detail"], navigationExtras);
  }

  collectAllEnseignant() {
    this.enseignantSubscription = this.enseignantService
      .getEnseignants()
      .subscribe({
        next: (enseignant) => {
          this.enseignants = enseignant;
          console.log(enseignant);
        },
      });
  }

  ngOnInit(): void {
    this.collectAllEnseignant();
    this.listSeances();

    this.userConnecte();
  }

  userConnecte() {
    return this.seanceService.getUserConnecte().subscribe((data) => {
      console.log(data);
    });
  }

  listSeances() {
    let id = localStorage.getItem("idTeacher") ?? "";
    return this.seanceService.getSeanceEnseignant(id).subscribe((seance) => {
      this.seances = seance;
    });
  }

  getEnseignatById(id) {
    return this.seanceService.getEnseignantByID(id).subscribe((result) => {
      this.enseignante = result;
      console.log(this.enseignante);
    });
  }
}
