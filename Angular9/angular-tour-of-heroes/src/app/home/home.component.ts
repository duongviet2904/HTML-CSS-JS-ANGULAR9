import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pageName = 'HomePage';
  public num = -1;
  constructor() { }

  ngOnInit(): void {
  }

  public xinChao(){
    alert(this.pageName);
  }
}
