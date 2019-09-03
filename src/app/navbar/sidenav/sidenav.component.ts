import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/services/auth.guard';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private guard: AuthGuard) { }

  ngOnInit() {
  }

}
