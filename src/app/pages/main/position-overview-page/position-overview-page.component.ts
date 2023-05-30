import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {PositionTableComponent} from "../../../components/position-table/position-table.component";
import {Position} from "../../../../models/Position";

@Component({
  selector: 'app-position-overview-page',
  templateUrl: './position-overview-page.component.html',
  styleUrls: ['./position-overview-page.component.scss']
})
export class PositionOverviewPageComponent implements AfterViewInit,OnDestroy{

  private selectedPositions: Position[] = [];
  @ViewChild(PositionTableComponent) positionTableComponent!: PositionTableComponent;
  ngAfterViewInit(): void {
    this.positionTableComponent.selection.changed.subscribe((change)=>{
      this.selectedPositions = change.source.selected;
      console.log(this.selectedPositions);
    });
  }

  ngOnDestroy(): void {
    this.positionTableComponent.selection.changed.unsubscribe();
  }
}
