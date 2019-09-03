import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthGuard } from 'src/app/services/auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form;
  constructor(private fb:FormBuilder, private auth:AuthenticationService, private guard: AuthGuard, private router: Router) {
    this.form = fb.group({
      userName: ['',Validators.required],
      password: ['',Validators.required]
    })
   }

  ngOnInit() {
  }



}
