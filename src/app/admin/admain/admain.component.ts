import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { username } from './username.model';
import * as JSPdf from 'jspdf'; // npm install jspdf --save
import 'jspdf-autotable';
import { formatDate } from '@angular/common';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddialogComponent } from './dialog/addialog.component';

@Component({
  selector: 'app-admain',
  templateUrl: './admain.component.html',
  styleUrls: ['./admain.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdmainComponent implements OnInit {
  lastYears = new Array();
  usersEntries;
  filter = { userName: "", startDate: "", endDate: "" };
  dataSource = this.usersEntries;
  periodHours;
  yearlyHours;
  allUsers;
  thisYear = new Date().getFullYear();

  constructor(private admin: AdminService, private dialog: MatDialog) { }
  displayedColumns: string[] = ['UserName', 'Date', 'FirstEntry', 'SecondEntry'];

  ngOnInit() {
    this.admin.getUsersEntry(this.filter.userName, this.filter.startDate, this.filter.endDate).subscribe(res => (this.usersEntries = res, console.log(this.usersEntries)))
    this.lastFiveYears()
    this.admin.usersList().subscribe((res: username) => (this.allUsers = res, console.log(res)))
    this.admin.monthlyHours(this.filter.userName, this.filter.startDate, this.filter.endDate).subscribe(res => this.periodHours = res)
    this.admin.yearlyHours(this.filter.userName).subscribe(res => this.yearlyHours = res)

  }

  lastFiveYears() {

    console.log(this.thisYear)

    for (var i = 0; i < 5; i++) {
      this.lastYears.push(this.thisYear - i);
    }
    console.log(this.lastYears)
  }

//on click request table period/year hours
  onSearch() {
    if (this.filter.startDate != "" && this.filter.endDate != "") {
      var formatedStartDate = formatDate(this.filter.startDate, 'dd/MM/yyyy', 'en-us')
      var formatedEndDate = formatDate(this.filter.endDate, 'dd/MM/yyyy', 'en-us')
    } else {
      formatedStartDate = ""
      formatedEndDate = ""
    }
    
    this.admin.getUsersEntry(this.filter.userName, formatedStartDate, formatedEndDate).subscribe(res => (this.usersEntries = res, console.log(this.usersEntries)))
    this.admin.monthlyHours(this.filter.userName, formatedStartDate, formatedEndDate).subscribe(res => this.periodHours = res)
    this.admin.yearlyHours(this.filter.userName).subscribe(res => this.yearlyHours = res)

  }

  //pdf export function
  exportUserPdf() {
    var doc = new JSPdf();
    var rows = [];
    var startDate;
    var endDate;
    var userName;
    var displayedColumns: string[] = ['Nume', 'Data', 'Ora sosirii', 'Ora plecarii'];

    if (this.filter.userName == "") {
      userName = "All"
    } else {
      userName = this.filter.userName
    }

    if (this.filter.startDate == "") {
      startDate = "Today"
    } else {
      startDate = formatDate(this.filter.startDate, 'dd/MM/yyyy', 'en-us')
    }
    if (this.filter.endDate == "") {
      endDate = "Today"
    } else {
      endDate = formatDate(this.filter.endDate, 'dd/MM/yyyy', 'en-us')
    }
    var foot = ["User: " + userName, "Start Date: " + startDate, "End Date: " + endDate, "Yearly hours: " + this.yearlyHours.mHours, "Period hours: " + this.periodHours.mHours];
    var data = [];
    data.push(this.usersEntries)
    console.log(foot)
    data[0].forEach(element => {
      var temp = [element.fullName, element.day, element.firstEntry, element.secondEntry];
      rows.push(temp)
    });
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text(foot, 0, 270)
    doc.autoTable(displayedColumns, rows, foot);
    doc.save("admin_condica.pdf");
  }

openDialog(): void {
    
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    //sends data to the dialog component
    dialogConfig.data = {
     

    }

    this.dialog.open(AddialogComponent, dialogConfig);
  }

}
