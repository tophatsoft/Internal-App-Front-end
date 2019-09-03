import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form;
  constructor(private fb: FormBuilder, private auth:AdminService) {
    this.form = fb.group({
      userName: ['',Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      department: ['',Validators.required],
      position: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]]
      // passwords: this.fb.group({
      //   password: ['', [Validators.required, Validators.minLength(6)]],
      //   confirmPassword: ['', Validators.required]
      // }, { validator: this.auth.comparePasswords })
    });

   }

  ngOnInit() {
  }

  

}