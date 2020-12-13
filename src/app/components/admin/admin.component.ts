import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public opened: boolean;

  constructor() {
    this.opened = false;
  }

  ngOnInit(): void {
  }

}
