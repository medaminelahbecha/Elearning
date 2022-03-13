import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";
import { Seance } from "src/app/models/seance";
import { Location } from "@angular/common";
import { User } from "src/app/models/user";
import { SeanceService } from "src/app/services/seanceService";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { UserService } from "src/app/services/userService";
@Component({
  selector: "app-seance-detail",
  templateUrl: "./seance-detail.component.html",
  styleUrls: ["./seance-detail.component.css"],
  providers: [MessageService],
})
export class SeanceDetailComponent implements OnInit {
  selectedSeance;
  htmlContent = "";
  resume;
  isTeacher;
  isAdmin;
  constructor(
    private seanceService: SeanceService,
    private userService: UserService,
    private _location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private modalService: NgbModal
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras?.state) {
      const state = navigation.extras.state as {
        seance: Seance;
      };

      this.selectedSeance = state.seance;
      console.log("aaaaaaa", state.seance);
    } else {
      this._location.back();
    }
  }

  public openPDF(): void {
    let DATA = document.getElementById("htmlData");

    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const FILEURI = canvas.toDataURL("image/png");
      let PDF = new jsPDF("p", "mm", "a4");
      let position = 0;

      PDF.addImage(FILEURI, "pdf", 0, position, fileWidth, fileHeight);

      PDF.save("Resume.pdf");
    });
  }
  open2(user: User) {
    const navigationExtras: NavigationExtras = {
      state: {
        student: user,
      },
      relativeTo: this.route,
    };
    this.router.navigate(["/teacher/detail-student"], navigationExtras);
  }
  changeStatus(presence: string, seance: Seance) {
    this.seanceService
      .changeStatus({ presence: presence }, seance._id)
      .subscribe({
        next: (result) => {
          seance.presence = presence;
        },
      });
  }
  chekAdmin() {
    return this.userService.isAdmin().subscribe((data) => {
      this.isAdmin = data;
    });
  }
  chekTeacher() {
    return this.userService.isTeacher().subscribe((data) => {
      this.isTeacher = data;
    });
  }
  sendResume() {
    let values = {
      resume: this.htmlContent,
    };
    this.seanceService.updateSeance(values, this.selectedSeance._id).subscribe({
      next: (value) => {
        this.htmlContent = "";
        this.selectedSeance;
        this.messageService.clear("myKey2");
        this.messageService.add({
          key: "myKey2",
          severity: "success",
          summary: "alert",
          detail: "Send Resume successfully",
        });
      },
      error: (error) => {},
    });
  }
  convertToPlain() {
    let html = this.selectedSeance.resume;
    // Create a new div element
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    // Retrieve the text property of the element
    return (this.resume = tempDivElement.textContent);
  }

  ngOnInit(): void {
    this.chekTeacher();
    this.chekAdmin();
    this.convertToPlain();
    this.resume;
    this.selectedSeance;
  }
}
