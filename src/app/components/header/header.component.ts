import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  status: boolean = false;
  clickMenu(){
      this.status = !this.status;       
  }
  constructor() { }

  ngOnInit(): void {
  }

}
