import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import * as JSPdf from 'jspdf'; // npm install jspdf --save
import 'jspdf-autotable';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class MainComponent implements OnInit {

  checkin;
  model;
  filter = { month: "", year: "" };
  weeklyHours;
  yearlyHours;
  errorMessage = false;
  lastYears = new Array();
  monthList = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  userName;
  displayedColumns: string[] = ['Date', 'FirstEntry', 'SecondEntry'];
  dataSource = this.checkin;  //links data to table
  constructor(private app: AppService, private dialog: MatDialog, private auth: AuthenticationService) { }

  ngOnInit() {
    console.log(this.filter)
    //returns this year this month
    this.app.getEntry(this.filter.year, this.filter.month).subscribe(res => (this.checkin = res,
      console.log(this.checkin)
    ))
    //returns today entry so we can check if user is clocked in or not
    this.app.todayEntry().subscribe(entry => { this.model = entry, console.log(entry) },
      err => {
        this.errorMessage = true;
      })
    //check year and returns last 5 years
    this.lastFiveYears()
    //return month and year summ
    this.app.monthlyHours(this.filter.year, this.filter.month).subscribe(res => this.weeklyHours = res)
    this.app.yearlyHours(this.filter.year).subscribe(res => this.yearlyHours = res)

  }

  onSearch() {

    this.app.getEntry(this.filter.year, this.filter.month).subscribe(res => (this.checkin = res,
      console.log(this.checkin)
    ))
    console.log(this.filter)
    this.app.monthlyHours(this.filter.year, this.filter.month).subscribe(res => this.weeklyHours = res)
    this.app.yearlyHours(this.filter.year).subscribe(res => this.yearlyHours = res)
  }
  //dialog for create entry
  OpenClockInDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    // //sends data to the dialog component
    dialogConfig.data = {
    }
    this.dialog.open(DialogComponent, dialogConfig);
  }

  OpenClockOutDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    //sends data to the dialog component
    dialogConfig.data = {
      id: this.model.id
    }
    this.dialog.open(DialogComponent, dialogConfig);
  }

  lastFiveYears() {
    var thisYear = new Date().getFullYear();
    console.log(thisYear)

    for (var i = 0; i < 5; i++) {
      this.lastYears.push(thisYear - i);
    }
    console.log(this.lastYears)
  }
  //pdf export function
  exportUserPdf() {
    this.auth.userSelected.subscribe(user => this.userName = user)
    var doc = new JSPdf();
    var rows = [];
    var year;
    var month;
    if (this.filter.year == "") {
      year = new Date().getFullYear();
    } else {
      year = this.filter.year
    }
    if (this.filter.month == "") {
      month = "This month"
    } else {
      month = this.filter.month
    }
    var foot = ["User: " + this.userName, "Year: " + year, "Month: " + month, "Yearly hours: " + this.yearlyHours.mHours, "Monthly hours: " + this.weeklyHours.mHours];
    var data = [];
    data.push(this.checkin)
    console.log(foot)
    data[0].forEach(element => {
      var temp = [element.day, element.firstEntry, element.secondEntry];
      rows.push(temp)
    });
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text(foot, 0, 280)
    doc.autoTable(this.displayedColumns, rows, foot);
    doc.save(this.userName + "_condica.pdf");
  }
}
