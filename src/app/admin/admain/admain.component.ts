import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { username } from './username.model';
import * as JSPdf from 'jspdf'; // npm install jspdf --save
import 'jspdf-autotable';
import { formatDate } from '@angular/common';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddialogComponent } from './dialog/addialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admain',
  templateUrl: './admain.component.html',
  styleUrls: ['./admain.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdmainComponent implements OnInit {
  usersEntries;
  filter = { userName: "", startDate: "", endDate: "" };
  dataSource = this.usersEntries;
  periodHours;
  yearlyHours;
  allUsers;
  thisYear = new Date().getFullYear(); //used in template

  constructor(private admin: AdminService, private dialog: MatDialog, private snackBar: MatSnackBar) { }
  displayedColumns: string[] = ['UserName', 'Date', 'FirstEntry', 'SecondEntry', 'More'];

  ngOnInit() {
    this.admin.getUsersEntry(this.filter.userName, this.filter.startDate, this.filter.endDate).subscribe(res => (this.usersEntries = res, console.log(this.usersEntries)))
    this.admin.usersList().subscribe((res: username) => (this.allUsers = res, console.log(res)))
    this.admin.monthlyHours(this.filter.userName, this.filter.startDate, this.filter.endDate).subscribe(res => this.periodHours = res)
    this.admin.yearlyHours(this.filter.userName).subscribe(res => this.yearlyHours = res)
  }

  //on click request table period/year hours
  onSearch() {
    //format date from datepicker imput to string
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
      startDate = formatDate(new Date(), 'dd/MM/yyyy', 'en-us')
    } else {
      startDate = formatDate(this.filter.startDate, 'dd/MM/yyyy', 'en-us')
    }
    if (this.filter.endDate == "") {
      endDate = formatDate(new Date(), 'dd/MM/yyyy', 'en-us')
    } else {
      endDate = formatDate(this.filter.endDate, 'dd/MM/yyyy', 'en-us')
    }
    var foot = ["User: " + userName + "  " + "Yearly hours: " + this.yearlyHours.mHours + "  " + "Period hours: " + this.periodHours.mHours];
    console.log(foot)
    this.usersEntries.forEach(element => {
      var temp = [element.fullName, element.day, element.firstEntry, element.secondEntry];
      rows.push(temp)
    });
    //if requested only one day change the text format
    if (startDate == endDate) {
      var dateParts = startDate.split("/")
      var date = ["Ziua: " + dateParts[0] + "  " + "luna: " + (dateParts[1]) + "  " + "anul: " + dateParts[2]]
    } else {
      var date = ["Interval: " + startDate + " - " + endDate]

    }
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text(foot, 0, 290)
    doc.text(date, 80, 10)
    doc.autoTable(displayedColumns, rows);
    doc.save("admin_condica.pdf");
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'dialogColor'

    //sends data to the dialog component
    dialogConfig.data = {}
    //opens addialog component
    this.dialog.open(AddialogComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => this.onSearch());
  }

  openUpdateDialog(element): void {
    console.log(element)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    //sends data to the dialog component
    dialogConfig.data = {
      id: element.id,
      userName: element.userName,
      day: element.day,
      firstEntry: element.firstEntry,
      secondEntry: element.secondEntry
    }
    //opens addialog component
    this.dialog.open(AddialogComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => this.onSearch());

  }

  deleteUserEntry(id) {
    if (confirm("Are you sure?")) {
      this.admin.deleteUserEntry(id).subscribe(res => (this.snackBar.open("Entry Deleted", "X", { duration: 2999 }), this.onSearch()));
    }
  }
}
