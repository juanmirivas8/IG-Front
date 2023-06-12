import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Application } from "../../../models/Application";
import { SelectionModel } from "@angular/cdk/collections";
import { ApplicationService } from "../../services/application.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-application-table',
  templateUrl: './application-table.component.html',
  styleUrls: ['./application-table.component.scss']
})
export class ApplicationTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() multipleSelection: boolean = true;
  availableColumns: string[] = [];
  filterColums: string[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: MatTableDataSource<Application>;
  @Input() selection = new SelectionModel<Application>(true, [], true);
  filterSelection = new SelectionModel<string>(true, [], true);
  filterNameHint: string = "";
  filterNameHintOptions: string[] = [
    "application_field_id",
    "application_field_candidate",
    "application_field_position",
    "application_field_status",
    "application_field_rejectionReason",
    "application_field_description",
  ];
  constructor(private applicationService: ApplicationService, private router: Router) {
    this.dataSource = new MatTableDataSource<Application>(this.applicationService.application);
    this.availableColumns = Application.getKeys();
    this.availableColumns.unshift('select');
    this.displayedColumns = Application.getKeys();
    this.displayedColumns.unshift('select');
    this.filterSelection.toggle('id');
    this.filterNameHint = this.filterNameHintOptions[0];
    this.filterColums=Application.getKeys();
  }

  ngOnInit(): void {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'candidate': return item.candidate?.name;
        case 'position': return item.position?.id;
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
  addApplication() {
    this.router.navigate(['/main/applications/newApplication']);
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
        case 'candidate': this.filterNameHint = this.filterNameHintOptions[1]; break;
        case 'position': this.filterNameHint = this.filterNameHintOptions[2]; break;
        case 'status': this.filterNameHint = this.filterNameHintOptions[3]; break;
        case 'rejectionReason': this.filterNameHint = this.filterNameHintOptions[4]; break;
        case 'description': this.filterNameHint = this.filterNameHintOptions[5]; break;
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
        case 'candidate': return data.candidate?.name.toLowerCase().includes(filter);
        case 'position': return data.position?.id == Number.parseInt(filter)
        case 'status': return data.status?.name.toLowerCase().includes(filter);
        case 'rejectionReason': return data.rejectionReason?.toLowerCase().includes(filter);
        case 'description': return data.description?.toLowerCase().includes(filter);
      }
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateToApplication(row:Application) {
    this.router.navigate(['/main/applications/', row.id]);
  }
}
