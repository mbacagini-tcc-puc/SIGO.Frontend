import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analises',
  templateUrl: './analises.component.html',
  styleUrls: ['./analises.component.scss']
})
export class AnalisesComponent implements OnInit {

  constructor() { }

  public items: Number [];
  public currentPage: Number;

  ngOnInit() {
    this.items = [];
    for(let i = 0; i < 50; i++) {
      this.items.push(i);
    }
  }

}
