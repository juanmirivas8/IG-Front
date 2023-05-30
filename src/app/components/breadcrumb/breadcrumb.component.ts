import { Component, OnInit } from '@angular/core';
import {firstValueFrom} from "rxjs";
import {BreadcrumbService} from "xng-breadcrumb";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  breadCrumbTitle: string = "";
  constructor(private breadCrumbService:BreadcrumbService) { }

  ngOnInit(): void {
    firstValueFrom(this.breadCrumbService.breadcrumbs$).then((crumbs) => {
      this.breadCrumbTitle = crumbs[crumbs.length - 1].label as string;
    });
  }

}
