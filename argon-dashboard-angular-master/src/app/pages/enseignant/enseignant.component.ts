import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import {
  NgbModalConfig,
  NgbModal,
  ModalDismissReasons,
} from "@ng-bootstrap/ng-bootstrap";
import { Enseignant } from "src/app/models/enseignant";
import { EnseignantService } from "src/app/services/enseignant.service";
import { MessageService } from "primeng/api";
import { Cours } from "src/app/models/cours";
import { CoursService } from "src/app/services/coursService";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Injectable } from "@angular/core"; // at top
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { IDropdownSettings } from "ng-multiselect-dropdown";

@Component({
  selector: "app-enseignant",
  templateUrl: "./enseignant.component.html",
  styleUrls: ["./enseignant.component.css"],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
})
export class EnseignantComponent implements OnInit {
  dropdownList = [];
  dropdownSettings: IDropdownSettings = {};
  p: number = 1;
  selectedEnseignant: Enseignant;
  searchText;
  cours: Cours[] = [];
  closeResult: string;
  enseignants: Enseignant[] = [];
  enseignant: Enseignant = new Enseignant();
  listLangue: String[] = [];
  constructor(
    private coursService: CoursService,
    config: NgbModalConfig,
    private router: Router,
    private modaleService: NgbModal,
    private enseignantService: EnseignantService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }

  open(content) {
    this.modaleService.open(content);
  }
  open2(content2, ens: Enseignant) {
    this.selectedEnseignant = ens;
    this.modaleService.open(content2);
  }
  open4(content, id) {
    this.modaleService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result === "yes") {
            this.deleteEnseignant(id);
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  open3(enseignant: Enseignant) {
    const navigationExtras: NavigationExtras = {
      state: {
        enseignant: enseignant,
      },
      relativeTo: this.route,
    };
    this.router.navigate(["/teacher-details"], navigationExtras);
  }
  ngOnInit(): void {
    //
    this.dropdownList = [
      { item_id: 1, item_text: "English" },
      { item_id: 2, item_text: "Spanish" },
      { item_id: 3, item_text: "Turkish" },
      { item_id: 4, item_text: "French" },
      { item_id: 5, item_text: "German" },
      { item_id: 6, item_text: "Italian" },
      { item_id: 5, item_text: "Arabic" },
    ];
    this.dropdownSettings = {
      idField: "item_id",
      textField: "item_text",
      allowSearchFilter: true,
      enableCheckAll: false,
    };
    this.listEnseignants();
    this.listCours();
    console.log(this.enseignants);
    this.enseignants;
  }

  listCours() {
    this.coursService.getCours().subscribe({
      next: (cours) => {
        this.cours = cours;
      },
    });
  }
  listEnseignants() {
    this.enseignantService.getEnseignants().subscribe({
      next: (enseignants) => {
        this.enseignants = enseignants;
        console.log("aaaaaaaaaa", this.enseignants);
      },
    });
  }
  onItemSelect(item: any) {
    this.listLangue.push(item.item_text);
  }
  RemoveElementFromStringArray(element: string) {
    if (this.listLangue.length > 0) {
      this.listLangue.forEach((value, index) => {
        if (value == element) this.listLangue.splice(index, 1);
      });
    }
  }
  onItemDeSelect(item: any) {
    this.RemoveElementFromStringArray(item.item_text);
  }

  saveEnseignant(enseignantForm: HTMLFormElement) {
    let name = (<HTMLInputElement>enseignantForm.elements.namedItem("name"))
      .value;
    let email = (<HTMLInputElement>enseignantForm.elements.namedItem("email"))
      .value;
    let phone = (<HTMLInputElement>enseignantForm.elements.namedItem("phone"))
      .value;
    let cours = (<HTMLInputElement>enseignantForm.elements.namedItem("cours"))
      .value;
    let url = (<HTMLInputElement>enseignantForm.elements.namedItem("url"))
      .value;

    let password = (<HTMLInputElement>(
      enseignantForm.elements.namedItem("password")
    )).value;

    let langue = this.listLangue;

    let values = {
      name,
      email,
      phone,
      cours,
      url,
      langue,
      password,
    };

    this.enseignantService.saveEnseignant(values).subscribe({
      next: (enseigant) => {
        enseignantForm.reset();
        this.modaleService.dismissAll();
        this.listEnseignants();
        this.messageService.add({
          key: "myKey1",
          severity: "success",
          summary: "alert",
          detail: "add Teacher successfully",
        });
      },
      error: (enseignant) => {
        let error = enseignant.error.error.message;

        console.log(error);

        this.messageService.add({
          key: "myKey1",
          severity: "warn",
          summary: "alert",
          detail: error,
        });
      },
    });

    //console.log(values);
  }

  updateEnseignant(updateForm: HTMLFormElement) {
    let name = (<HTMLInputElement>updateForm.elements.namedItem("name")).value;
    let email = (<HTMLInputElement>updateForm.elements.namedItem("email"))
      .value;
    let phone = (<HTMLInputElement>updateForm.elements.namedItem("phone"))
      .value;
    let cours = (<HTMLInputElement>updateForm.elements.namedItem("cours"))
      .value;
    let url = (<HTMLInputElement>updateForm.elements.namedItem("url")).value;

    let password = (<HTMLInputElement>updateForm.elements.namedItem("password"))
      .value;
    let langue = this.listLangue;

    let values = {
      name,
      email,
      phone,
      cours,
      url,
      langue,
      password,
    };

    this.enseignantService
      .updateEnseignant(values, this.selectedEnseignant._id)
      .subscribe({
        next: (value) => {
          this.listEnseignants();
          this.modaleService.dismissAll();
          this.messageService.add({
            key: "myKey2",
            severity: "success",
            summary: "alert",
            detail: "update Teacher successfully",
          });
        },
        error: (error) => {},
      });
  }

  getEnseignantById(id) {
    this.enseignantService.getEnseignantById(id).subscribe((data) => {
      this.enseignant = data;
      console.log("response", this.enseignant);
      this.listEnseignants();
    });
  }

  deleteEnseignant(id) {
    this.enseignantService.deleteEnseignant(id).subscribe((data) => {
      console.log("deleted response", data);
      this.listEnseignants();
      this.messageService.add({
        key: "myKey3",
        severity: "warn",
        summary: "alert",
        detail: "delete Teacher successfully",
      });
    });
  }
}
