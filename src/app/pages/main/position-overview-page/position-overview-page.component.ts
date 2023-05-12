import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {PositionService} from "../../../services/position.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Position} from "../../../../models/Position";

@Component({
  selector: 'app-position-overview-page',
  templateUrl: './position-overview-page.component.html',
  styleUrls: ['./position-overview-page.component.scss']
})
export class PositionOverviewPageComponent implements OnInit,AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnsToDisplay: string[] = ['select','project', 'status','id'];
  displayedColumns: string[] = ['select','project', 'status','id'];
  dataSource :MatTableDataSource<Position>;
  selection = new SelectionModel<any>(true, []);
  constructor(private positionService: PositionService) {
    this.dataSource = new MatTableDataSource<Position>(this.positionService.positions);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  isColumnVisible(column: string): boolean {
    return this.displayedColumns.includes(column);
  }

  toggleColumn(column: string): void {
    const index = this.displayedColumns.indexOf(column);
    if (index !== -1) {
      this.displayedColumns.splice(index, 1);
    } else {
      const columnIndex = this.columnsToDisplay.indexOf(column);
      if (columnIndex !== -1) {
        this.displayedColumns.splice(columnIndex, 0, column);
      }
    }
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: Position, filter: string)=>{return data.id == Number.parseInt(filter);}
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
}
