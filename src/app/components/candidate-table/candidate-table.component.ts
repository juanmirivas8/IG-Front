import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { Router } from "@angular/router";
import { Candidate } from 'src/models/Candidate';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-candidate-table',
  templateUrl: './candidate-table.component.html',
  styleUrls: ['./candidate-table.component.scss']
})
export class CandidateTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() multipleSelection: boolean = true;
  availableColumns: string[] = [];
  filterColums: string[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: MatTableDataSource<Candidate>;
  @Input() selection = new SelectionModel<Candidate>(true, [], true);
  filterSelection = new SelectionModel<string>(true, [], true);
  filterNameHint: string = "";
  filterNameHintOptions: string[] = [
    "candidate_field_id",
    "candidate_field_name",
    "candidate_field_surname",
    "candidate_field_description",
    "candidate_field_status",
    "candidate_field_contactMethod",
    "candidate_field_cvDate",
    "candidate_field_interviewDate",
    "candidate_field_technicalTestDate",
    "candidate_field_firstContactDate"
  ];
  constructor(private candidateService: CandidateService, private router: Router) {
    this.dataSource = new MatTableDataSource<Candidate>(this.candidateService.candidates);
    this.availableColumns = Candidate.getKeys();
    this.availableColumns.unshift('select');
    this.displayedColumns = Candidate.getKeys();
    this.displayedColumns.unshift('select');
    this.filterSelection.toggle('id');
    this.filterNameHint = this.filterNameHintOptions[0];
    this.filterColums=Candidate.getKeys();
  }

  ngOnInit(): void {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'status': return item.status?.name;
        case 'contactMethod': return item.contactMethod?.name;
        default: // @ts-ignore
          return item[property];
      }
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  addCandidate() {
    this.router.navigate(['/main/candidates/newCandidate']);
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
        case 'name': this.filterNameHint = this.filterNameHintOptions[1]; break;
        case 'surname': this.filterNameHint = this.filterNameHintOptions[2]; break;
        case 'description': this.filterNameHint = this.filterNameHintOptions[3]; break;
        case 'status': this.filterNameHint = this.filterNameHintOptions[4]; break;
        case 'contactMethod': this.filterNameHint = this.filterNameHintOptions[5]; break;
        case 'cvDate': this.filterNameHint = this.filterNameHintOptions[6]; break;
        case 'interviewDate': this.filterNameHint = this.filterNameHintOptions[7]; break;
        case 'technicalTestDate': this.filterNameHint = this.filterNameHintOptions[8]; break;
        case 'firstContactDate': this.filterNameHint = this.filterNameHintOptions[9]; break;
      }
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    let selectedFilter = this.filterSelection.selected[0];

    // @ts-ignore
    this.dataSource.filterPredicate = (data: Candidate, filter: string) => {
      switch (selectedFilter) {
        case 'id': return data.id == Number.parseInt(filter);
        case 'name': return data.name?.toLowerCase().includes(filter);
        case 'surname': return data.surname?.toLowerCase().includes(filter);
        case 'description': return data.description?.toLowerCase().includes(filter);
        case 'status': return data.status?.name.toLowerCase().includes(filter);
        case 'contactMethod': return data.contactMethod?.name.toLowerCase().includes(filter);
        case 'cvDate': return data.cvDate?.toLocaleString().toLowerCase().includes(filter);
        case 'interviewDate': return data.interviewDate?.toLocaleString().toLowerCase().includes(filter);
        case 'technicalTestDate': return data.technicalTestDate?.toLocaleString().toLowerCase().includes(filter);
        case 'firstContactDate': return data.firstContactDate?.toLocaleString().toLowerCase().includes(filter);
      }
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateToCandidate(row:Candidate) {
    this.router.navigate(['/main/candidates/', row.id]);
  }
}

