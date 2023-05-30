import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-position-info-page',
  templateUrl: './position-info-page.component.html',
  styleUrls: ['./position-info-page.component.scss']
})
export class PositionInfoPageComponent implements OnInit {
  isEditing = false;
/*   name!: string;
  weight!: number; */

  startEditing() {
    this.isEditing = true;
  }
  guardar() {
  //Al dar guardar hace lo que este aqui
  }


  constructor() { }

  ngOnInit(): void {
  }

}
