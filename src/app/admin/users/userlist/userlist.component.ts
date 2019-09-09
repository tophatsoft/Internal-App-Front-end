import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
userList;
  constructor(private admin: AdminService) { }

  ngOnInit() {
    this.admin.usersList().subscribe(res => (this.userList = res, console.log(res)))
  }

}
