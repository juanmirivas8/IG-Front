import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Position} from "../../../../models/Position";
import {firstValueFrom} from "rxjs";
import {PositionService} from "../../../services/position.service";

@Component({
  selector: 'app-position-overview-page',
  templateUrl: './position-overview-page.component.html',
  styleUrls: ['./position-overview-page.component.scss']
})
export class PositionOverviewPageComponent {

  positions: MatTableDataSource<Position> = new MatTableDataSource<Position>();
  constructor(private positionService: PositionService) {
    firstValueFrom(this.positionService.getAll()).then((response)=>{
      this.positions.data = response.data;
    });
  }
}
