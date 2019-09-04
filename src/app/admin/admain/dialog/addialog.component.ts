import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { username } from '../username.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-addialog',
  templateUrl: './addialog.component.html',
  styleUrls: ['./addialog.component.css']
})
export class AddialogComponent implements OnInit {
data;
allUsers;
  constructor(private dialogRef: MatDialogRef<AddialogComponent>,@Inject(MAT_DIALOG_DATA) data, private admin: AdminService) {this.data = data }

  ngOnInit() {
    this.admin.usersList().subscribe((res: username) => (this.allUsers = res, console.log(res)))

  }

  onAddEntry(data) {
    data.day = formatDate(data.day, 'dd/MM/yyyy', 'en-us')
    this.admin.addUserEntry(data)
  }

}
