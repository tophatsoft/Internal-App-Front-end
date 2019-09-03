import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admain',
  templateUrl: './admain.component.html',
  styleUrls: ['./admain.component.css']
})
export class AdmainComponent implements OnInit {
  lastYears = new Array();
  usersEntries;
  filter ={userName: "", year :"", startMonth: "", endMonth:""};
  dataSource = this.usersEntries;

  constructor(private admin: AdminService) { }
  displayedColumns: string[] = ['UserName','Date', 'FirstEntry', 'SecondEntry'];

  ngOnInit() {
    this.admin.getUsersEntry(this.filter.userName, this.filter.year, this.filter.startMonth, this.filter.endMonth).subscribe(res => (this.usersEntries = res,console.log(this.usersEntries)))
    this.lastFiveYears()
  }


  lastFiveYears() {
    var thisYear = new Date().getFullYear();
    console.log(thisYear)

    for (var i = 0; i < 5; i++) {
      this.lastYears.push(thisYear - i);
    }
    console.log(this.lastYears)
  }
}
