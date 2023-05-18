import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Position} from "../../../models/Position";
import {SelectionModel} from "@angular/cdk/collections";
import {PositionService} from "../../services/position.service";

@Component({
  selector: 'app-position-table',
  templateUrl: './position-table.component.html',
  styleUrls: ['./position-table.component.scss']
})
export class PositionTableComponent implements OnInit,AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnsToDisplay: string[] = ['select','project', 'status','id'];
  displayedColumns: string[] = ['select','project', 'status','id'];
  filterColumns: string[] = [];
  dataSource :MatTableDataSource<Position>;
  selection = new SelectionModel<Position>(true, [],true);
  filterNameHint: string = "Search by ID";
  constructor(private positionService: PositionService) {
    this.dataSource = new MatTableDataSource<Position>(this.positionService.positions);
    this.columnsToDisplay = Position.getKeys();
    this.displayedColumns = Position.getKeys();
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
    var allColumns = this.filterColumns.length == 0;
    // @ts-ignore
    this.dataSource.filterPredicate = (data: Position, filter: string)=>{
      return ((allColumns||this.filterColumns.includes('id')) && data.id == Number.parseInt(filter))||
        ((allColumns||this.filterColumns.includes('project')) && data.project?.name.toLowerCase().includes(filter))||
        ((allColumns||this.filterColumns.includes('status')) && data.status?.name.toLowerCase().includes(filter))||
        ((allColumns||this.filterColumns.includes('description')) && data.description?.toLowerCase().includes(filter))||
        ((allColumns||this.filterColumns.includes('vacancies')) && data.vacancies == Number.parseInt(filter))||
        ((allColumns||this.filterColumns.includes('creationDate')) && data.creationDate?.toLocaleString().toLowerCase().includes(filter))||
        ((allColumns||this.filterColumns.includes('closingDate')) && data.closingDate?.toLocaleString().toLowerCase().includes(filter))||
        ((allColumns||this.filterColumns.includes('lastUpdate')) && data.lastUpdate?.toLocaleString().toLowerCase().includes(filter))||
        ((allColumns||this.filterColumns.includes('area')) && data.area?.name.toLowerCase().includes(filter))||
        ((allColumns||this.filterColumns.includes('rol')) && data.rol?.name.toLowerCase().includes(filter))||
        ((allColumns||this.filterColumns.includes('subRol')) && data.subRol?.name.toLowerCase().includes(filter))||
        ((allColumns||this.filterColumns.includes('localization')) && data.localization?.name.toLowerCase().includes(filter));
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  handleCheckboxChange(event: any, column: string) {
    if (event.checked) {
      // Add the column to the checked items array
      this.filterColumns.push(column);
    } else {
      // Remove the column from the checked items array
      const index = this.filterColumns.indexOf(column);
      if (index >= 0) {
        this.filterColumns.splice(index, 1);
      }
    }
  }
}
