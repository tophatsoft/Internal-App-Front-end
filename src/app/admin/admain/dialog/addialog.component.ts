import { Component, OnInit, Inject,ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { username } from '../username.model';
import { formatDate } from '@angular/common';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

@Component({
  selector: 'app-addialog',
  templateUrl: './addialog.component.html',
  styleUrls: ['./addialog.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class AddialogComponent implements OnInit {
data;
allUsers;
//theme change for time pickers
darkTheme: NgxMaterialTimepickerTheme = {
  container: {
      bodyBackgroundColor: '#fafafa',
      buttonColor: '#3f51b5'
  },
  dial: {
      dialBackgroundColor: '#3f51b5',
  },
  clockFace: {
      clockFaceBackgroundColor: '#b0b0b0',
      clockHandColor: '#3f51b5',
      clockFaceTimeInactiveColor: '#fff'
  }
};

  constructor(private dialogRef: MatDialogRef<AddialogComponent>,@Inject(MAT_DIALOG_DATA) data, private admin: AdminService) {this.data = data }

  ngOnInit() {
    this.admin.usersList().subscribe((res: username) => (this.allUsers = res, console.log(res)))
    console.log(this.data)
  }

  onAddEntry(data) {
    data.day = formatDate(data.day, 'dd/MM/yyyy', 'en-us')
    this.admin.addUserEntry(data)
  }
  onUpdateEntry(data) {
    this.admin.updateUserEntry(data);
  }

  

}
