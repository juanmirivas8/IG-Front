import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Position } from "../../../models/Position";
import { SelectionModel } from "@angular/cdk/collections";
import { PositionService } from "../../services/position.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-position-table',
  templateUrl: './position-table.component.html',
  styleUrls: ['./position-table.component.scss']
})
export class PositionTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() multipleSelection: boolean = true;
  availableColumns: string[] = [];
  filterColums: string[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: MatTableDataSource<Position>;
  @Input() selection = new SelectionModel<Position>(true, [], true);
  filterSelection = new SelectionModel<string>(true, [], true);
  filterNameHint: string = "";
  filterNameHintOptions: string[] = [
    "position_field_id",
    "position_field_project",
    "position_field_status",
    "position_field_description",
    "position_field_vacancies",
    "position_field_creationDate",
    "position_field_closingDate",
    "position_field_lastUpdate",
    "position_field_localization",
    "position_field_area",
    "position_field_rol",
    "position_field_subrol"
  ];
  constructor(private positionService: PositionService, private router: Router) {
    this.dataSource = new MatTableDataSource<Position>();
    this.availableColumns = Position.getKeys();
    this.availableColumns.unshift('select');
    this.displayedColumns = Position.getKeys();
    this.displayedColumns.unshift('select');
    this.filterSelection.toggle('id');
    this.filterNameHint = this.filterNameHintOptions[0];
    this.filterColums=Position.getKeys();
  }

  ngOnInit(): void {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'project': return item.project?.name;
        case 'area': return item.area?.name;
        case 'rol': return item.rol?.name;
        case 'subRol': return item.subRol?.name;
        case 'localization': return item.localization?.name;
        case 'status': return item.status?.name;
        default: // @ts-ignore
          return item[property];
      }
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  addPosition() {
    this.router.navigate(['/main/positions/newPosition']);
  }
  isColumnVisible(column: string): boolean {
    return this.displayedColumns.includes(column);
  }

  toggleColumn(column: string): void {
    const index = this.displayedColumns.indexOf(column);
    if (index !== -1) {
      this.displayedColumns.splice(index, 1);
    } else {
      const columnIndex = this.availableColumns.indexOf(column);
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
    if (this.multipleSelection) {
      this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
    } else {
      this.selection.clear();
    }
  }
  toggleRowSelection(row: any) {
    if (this.multipleSelection) {
      this.selection.toggle(row);
    } else {
      let wasSelected = this.selection.isSelected(row);
      this.selection.clear();
      if (!wasSelected) {
        this.selection.select(row);
      }
    }
  }
  toggleFilterSelection(filter: string) {
    let wasSelected = this.filterSelection.isSelected(filter);
    if (!wasSelected) {
      this.filterSelection.clear();
      this.filterSelection.select(filter);
      switch (this.filterSelection.selected[0]) {
        case 'id': this.filterNameHint = this.filterNameHintOptions[0]; break;
        case 'project': this.filterNameHint = this.filterNameHintOptions[1]; break;
        case 'status': this.filterNameHint = this.filterNameHintOptions[2]; break;
        case 'description': this.filterNameHint = this.filterNameHintOptions[3]; break;
        case 'vacancies': this.filterNameHint = this.filterNameHintOptions[4]; break;
        case 'creationDate': this.filterNameHint = this.filterNameHintOptions[5]; break;
        case 'closingDate': this.filterNameHint = this.filterNameHintOptions[6]; break;
        case 'lastUpdate': this.filterNameHint = this.filterNameHintOptions[7]; break;
        case 'localization': this.filterNameHint = this.filterNameHintOptions[8]; break;
        case 'area': this.filterNameHint = this.filterNameHintOptions[9]; break;
        case 'rol': this.filterNameHint = this.filterNameHintOptions[10]; break;
        case 'subrol': this.filterNameHint = this.filterNameHintOptions[11]; break;
      }
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    let selectedFilter = this.filterSelection.selected[0];

    // @ts-ignore
    this.dataSource.filterPredicate = (data: Position, filter: string) => {
      switch (selectedFilter) {
        case 'id': return data.id == Number.parseInt(filter);
        case 'project': return data.project?.name.toLowerCase().includes(filter);
        case 'status': return data.status?.name.toLowerCase().includes(filter);
        case 'description': return data.description?.toLowerCase().includes(filter);
        case 'vacancies': return data.vacancies == Number.parseInt(filter);
        case 'creationDate': return data.creationDate?.toLocaleString().toLowerCase().includes(filter);
        case 'closingDate': return data.closingDate?.toLocaleString().toLowerCase().includes(filter);
        case 'lastUpdate': return data.lastUpdate?.toLocaleString().toLowerCase().includes(filter);
        case 'localization': return data.localization?.name.toLowerCase().includes(filter);
        case 'area': return data.area?.name.toLowerCase().includes(filter);
        case 'rol': return data.rol?.name.toLowerCase().includes(filter);
        case 'subRol': return data.subRol?.name.toLowerCase().includes(filter);
      }
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateToPosition(row:Position) {
    console.log(row);
    this.router.navigate([`/main/positions/${row.id}`]);
  }
}
