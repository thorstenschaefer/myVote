import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { UserService } from '../data/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [UserService]
})
export class HeaderComponent implements OnInit {

  constructor(private userService:UserService) {}

  ngOnInit() {
  }

}
