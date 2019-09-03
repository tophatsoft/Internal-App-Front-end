import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { user } from '../navbar/user.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private snackBar: MatSnackBar) { }
 
  private selectedUser = new BehaviorSubject("");
  userSelected = this.selectedUser.asObservable();

   // USERS
  loggedInUserName(user:string) {
    this.selectedUser.next(user)
  }

  login(credentials) {

    this.http.post("http://localhost:54425/api/ApplicationUser/login", credentials).subscribe(res =>(
      this.authenticate(res),
      this.router.navigateByUrl("").then(x => location.reload())  
      ),err => 
      {
        this.snackBar.open(err.error.message,"X",{duration: 2999})
      }
      );
  }
  //set token to localstorage
  authenticate(res) {

    localStorage.setItem('token', res.token)
  }

  // //validator to confirm the password
  comparePasswords(fb: FormGroup) {

    let confirmPasswordCtrl = fb.get('confirmPassword');
    if (confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors) {
      if (fb.get('password').value != confirmPasswordCtrl.value)
        confirmPasswordCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPasswordCtrl.setErrors(null);
    }
  }

  changePassword(passModel) {
       //remove password, confirm pass and replace with only one obj
      passModel.newPassword = passModel.passwords.password; 
      delete passModel.passwords
      let verifiedCredentials = Object.assign({}, passModel)

    this.http.put("http://localhost:54425/api/userprofile/changepass", verifiedCredentials).subscribe(res =>{
      console.log(res),
      this.snackBar.open("Password Changed","X",{duration: 2999})

  },err => {
        this.snackBar.open(err.error.message,"X",{duration: 2999})
        
  });
    
    console.log(passModel)
  }


  //looks for user role in token => returns true if match with user role in routing module
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    console.log(userRole)
    allowedRoles.forEach(element => {
      if(userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
 
  passChanged() {
     return this.http.get("http://localhost:54425/api/userprofile/firstLoggin")
  }
  
}
