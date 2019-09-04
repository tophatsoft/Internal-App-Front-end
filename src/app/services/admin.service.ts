import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private router: Router,private fb: FormBuilder,private snackBar: MatSnackBar) { }

  
  register(credentials) {

    this.http.post("http://localhost:54425/api/ApplicationUser/register", credentials).subscribe(res =>{
      console.log(res),
      this.snackBar.open("User Created","X",{duration: 2999})

    },err => {
          this.snackBar.open(err.error.message,"X",{duration: 2999})
          
    });
    console.log(credentials)
       
  }
  usersList() {
   return this.http.get("http://localhost:54425/api/applicationuser/userlist")
  }
  getUsersEntry(userName, startDate, endDate) {
    return this.http.get("http://localhost:54425/api/checkin/adcondica?username=" + userName +"&startDate=" + startDate+"&endDate=" + endDate)
  }
  monthlyHours(userName, startDate,endDate) {
    return this.http.get("http://localhost:54425/api/checkin/adtotalmonth?username=" + userName +"&startDate=" + startDate+"&endDate=" + endDate )
  }
  yearlyHours(userName) {
    return this.http.get("http://localhost:54425/api/checkin/adtotalyear?username="+userName)
  }

  addUserEntry(model) {
    return this.http.post("http://localhost:54425/api/checkin/adduserentry", model).subscribe(res =>  this.snackBar.open("Entry Added","X",{duration: 2999}))
  }


}
