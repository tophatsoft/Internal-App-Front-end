import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthGuard } from '../services/auth.guard';
import { AuthenticationService } from '../services/authentication.service';
import { user } from './user.models';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();
  passChanged = true
  user;
  constructor(private guard: AuthGuard, private auth: AuthenticationService) {

  }

  ngOnInit() {
    if (!!localStorage.getItem('token')) {
      this.auth.passChanged().subscribe((res: user) => (
        this.passChanged = res.passChanged,
        this.user = res.userName,
        //transfer userName to other component
        this.auth.loggedInUserName(res.userName)
      ))
    }
    
  }

}
