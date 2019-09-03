import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
form;
  constructor(private fb: FormBuilder, private auth:AuthenticationService) {

    this.form = fb.group({
      currentPassword: ['',Validators.required],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.auth.comparePasswords })
    });
   }

  ngOnInit() {
    
  }

}
