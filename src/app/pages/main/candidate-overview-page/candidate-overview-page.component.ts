import { Component, OnInit } from '@angular/core';
import {CandidateService} from "../../../services/candidate.service";
import {MatTableDataSource} from "@angular/material/table";
import {Candidate} from "../../../../models/Candidate";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-candidate-overview-page',
  templateUrl: './candidate-overview-page.component.html',
  styleUrls: ['./candidate-overview-page.component.scss']
})
export class CandidateOverviewPageComponent implements OnInit {

  constructor(private candidateService:CandidateService) {
      firstValueFrom(this.candidateService.getAll()).then((response)=>{
        this.candidates.data = response.data;
      });
  }
  public candidates : MatTableDataSource<Candidate> = new MatTableDataSource<Candidate>();

  ngOnInit(): void {
  }

}
