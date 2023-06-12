import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Application} from "../../../../models/Application";
import {ApplicationService} from "../../../services/application.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-application-overview-page',
  templateUrl: './application-overview-page.component.html',
  styleUrls: ['./application-overview-page.component.scss']
})
export class ApplicationOverviewPageComponent implements OnInit {

  applications: MatTableDataSource<Application> = new MatTableDataSource<Application>();
  constructor(private applicationService:ApplicationService) {
    firstValueFrom(this.applicationService.getAll()).then((response)=>{
      this.applications.data = response.data;
    });
  }

  ngOnInit(): void {

  }

}
