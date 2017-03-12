import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {
  causeNumber1 : number = 0;
  causeNumber2 : number = 0;
  causeNumber3 : number = 0;
  totalCauseNumber: number;
  constructor() { 
    
  }

  ngOnInit() {
  }
  ngDoCheck(){
    this.totalCauseNumber = this.causeNumber1 * 1
    + this.causeNumber2 * 2 
    + this.causeNumber3 * 3;
  }
}
