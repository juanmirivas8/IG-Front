import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { LookUpService } from 'src/app/services/look-up.service';
import { PositionService } from 'src/app/services/position.service';
import { Application } from 'src/models/Application';
import { Candidate } from 'src/models/Candidate';
import { Position } from 'src/models/Position';

@Component({
  selector: 'app-application-info-page',
  templateUrl: './application-info-page.component.html',
  styleUrls: ['./application-info-page.component.scss']
})
export class ApplicationInfoPageComponent implements OnInit {
  positionSelectionModel = new SelectionModel<Position>(true, [], true);
  candidateSelectionModel = new SelectionModel<Candidate>(true, [], true);

  candidates: MatTableDataSource<Candidate> = new MatTableDataSource<Candidate>();
  positions: MatTableDataSource<Position> = new MatTableDataSource<Position>();

  public isInserting: boolean = false;
  public isUpdating: boolean = true;

  public form: FormGroup = new FormGroup({});
  public application: Application = {};
  constructor(public lookUpService: LookUpService, private fb: FormBuilder, private actRoute: ActivatedRoute,
    private router: Router, private positionService: PositionService, private candidateService: CandidateService,
    private applicationService: ApplicationService) {

      var id = this.actRoute.snapshot.paramMap.get('id');
      console.log(id);

      if (id == null || undefined) {
        this.isInserting = true;
        this.isUpdating = true;
      } else {
        this.isUpdating = false;
        this.isInserting = false;

        firstValueFrom(this.applicationService.get(Number.parseInt(id))).then((response) => {
          this.application = response.data;
        });
      }

    firstValueFrom(this.positionService.getAll()).then((response)=>{
      this.positions.data = response.data;
    });

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      candidateName: new FormControl(this.application.candidate?.name, [Validators.required]),
      positionName: new FormControl(this.application.position?.project, [Validators.required]),
      description: new FormControl(this.application.description, [Validators.required]),
      status: new FormControl(this.application.status, [Validators.required]),
      rejectionReason: new FormControl(this.application.rejectionReason, [Validators.required]),
    });
  }
  editAction() {
    this.isUpdating = true;

    this.form = this.fb.group({
      candidateName: new FormControl(this.application.candidate?.name, [Validators.required]),
      positionName: new FormControl(this.application.position?.project, [Validators.required]),
      description: new FormControl(this.application.description, [Validators.required]),
      status: new FormControl(this.application.status, [Validators.required]),
      rejectionReason: new FormControl(this.application.rejectionReason, [Validators.required]),
    });
  }
  insertAction() {
    this.application = {
      // id:this.application.id,
      // name: this.form.get("name")?.value,
      // surname: this.form.get("surname")?.value,
      // description: this.form.get("description")?.value,
      // status: this.form.get("status")?.value,
      // contactMethod: this.form.get("contactMethod")?.value,
      // cvDate: this.form.get("cvDate")?.value,
      // interviewDate: this.form.get("interviewDate")?.value,
      // technicalTestDate: this.form.get("technicalTestDate")?.value,
      // firstContactDate: this.form.get("firstContactDate")?.value,
    }
    console.log(this.application);

    if (!this.isInserting) {
      firstValueFrom(this.applicationService.update(this.application))
        .then((response) => {
          console.log(response);
          this.application = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isUpdating = false;
        });
    } else {
      firstValueFrom(this.applicationService.create(this.application))
        .then((response) => {
          console.log(response);
          this.application = response.data;
          this.router.navigate([`/main/candidates/${response.data.id}`]);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {

        });
    }

  }

  compareId(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  cancelAction() {
    this.isUpdating = false;
  }
}
