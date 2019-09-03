import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { DatePipe,  } from '@angular/common';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  data; 

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

  constructor(private app:AppService, private datepipe: DatePipe, private dialogRef: MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) data) {
    this.data = data;//receives data from main component to populate form
    // var dateParts = this.data.day.split("/")
    // var dateObject = new Date(+dateParts[2], dateParts[1] -1, + dateParts[0] ) //change date format and type
    // this.data.day = dateObject
  
  }

  ngOnInit() {
    
  }

  clockIn(data) {
    // this.data.day = this.datepipe.transform(this.data.day, 'dd/MM/yyyy') //convert and format date to string 
    this.app.addEntry(data)
  }

  clockOut(data) {
    // this.data.day = this.datepipe.transform(this.data.day, 'dd/MM/yyyy') //convert and format date to string 
    console.log(data)
    this.app.editEntry(data)
    
  }
}
