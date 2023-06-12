import {Component, OnInit} from '@angular/core';
import {LookUpService} from "../../../services/look-up.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SelectionModel} from "@angular/cdk/collections";
import {Candidate} from "../../../../models/Candidate";
import {Application} from "../../../../models/Application";
import {CandidateService} from "../../../services/candidate.service";
import {ApplicationService} from "../../../services/application.service";
import {PositionService} from "../../../services/position.service";
import {firstValueFrom} from "rxjs";
import {MatTableDataSource} from '@angular/material/table';
import {Position} from "../../../../models/Position";

@Component({
  selector: 'app-candidate-info-page',
  templateUrl: './candidate-info-page.component.html',
  styleUrls: ['./candidate-info-page.component.scss']
})
export class CandidateInfoPageComponent implements OnInit {
  positionSelectionModel = new SelectionModel<Position>(true, [], true);
  applicationSelectionModel = new SelectionModel<Application>(true, [], true);

  applications: MatTableDataSource<Application> = new MatTableDataSource<Application>();
  positions: MatTableDataSource<Position> = new MatTableDataSource<Position>();

  public isInserting: boolean = false;
  public isUpdating: boolean = true;

  public form: FormGroup = new FormGroup({});
  public candidate: Candidate = {};
  constructor(public lookUpService: LookUpService, private fb: FormBuilder, private actRoute: ActivatedRoute,
    private router: Router, private positionService: PositionService, private candidateService: CandidateService,
    private applicationService: ApplicationService) {

    this.form = this.fb.group({
      name: new FormControl(this.candidate.name, [Validators.required]),
      surname: new FormControl(this.candidate.surname, [Validators.required]),
      description: new FormControl(this.candidate.description, [Validators.required]),
      status: new FormControl(this.candidate.status, [Validators.required]),
      contactMethod: new FormControl(this.candidate.contactMethod, [Validators.required]),
      cvDate: new FormControl(this.candidate.cvDate, [Validators.required]),
      interviewDate: new FormControl(this.candidate.interviewDate, [Validators.required]),
      technicalTestDate: new FormControl(this.candidate.technicalTestDate, [Validators.required]),
      firstContactDate: new FormControl(this.candidate.firstContactDate, [Validators.required]),
    });



  }
  async ngOnInit(): Promise<void> {
    var id = this.actRoute.snapshot.paramMap.get('id');
    console.log(id);

    if (id == null || undefined) {
      this.isInserting = true;
      this.isUpdating = true;
    } else {
      this.isUpdating = false;
      this.isInserting = false;

      await firstValueFrom(this.candidateService.getById(Number.parseInt(id))).then((response) => {
        this.candidate = response.data;
      });

      await firstValueFrom(this.applicationService.getAll()).then((response) => {
        this.applications.data = response.data;
      });

      this.applications.data = this.applications.data.filter((application) => {
        return application.candidate?.id == this.candidate.id;
      });
      this.applications.connect();

    }

    firstValueFrom(this.positionService.getAll()).then((response)=>{
      this.positions.data = response.data;
    });
  }
  editAction() {
    this.isUpdating = true;

    this.form = this.fb.group({
      name: new FormControl(this.candidate.name, [Validators.required]),
      surname: new FormControl(this.candidate.surname, [Validators.required]),
      description: new FormControl(this.candidate.description, [Validators.required]),
      status: new FormControl(this.candidate.status, [Validators.required]),
      contactMethod: new FormControl(this.candidate.contactMethod, [Validators.required]),
      cvDate: new FormControl(this.candidate.cvDate, [Validators.required]),
      interviewDate: new FormControl(this.candidate.interviewDate, [Validators.required]),
      technicalTestDate: new FormControl(this.candidate.technicalTestDate, [Validators.required]),
      firstContactDate: new FormControl(this.candidate.firstContactDate, [Validators.required])
    });
  }
  insertAction() {
    this.candidate = {
      id:this.candidate.id,
      name: this.form.get("name")?.value,
      surname: this.form.get("surname")?.value,
      description: this.form.get("description")?.value,
      status: this.form.get("status")?.value,
      contactMethod: this.form.get("contactMethod")?.value,
      cvDate: this.form.get("cvDate")?.value,
      interviewDate: this.form.get("interviewDate")?.value,
      technicalTestDate: this.form.get("technicalTestDate")?.value,
      firstContactDate: this.form.get("firstContactDate")?.value,
      applications: this.applicationSelectionModel.selected
    }
    console.log(this.candidate);

    if (!this.isInserting) {
      firstValueFrom(this.candidateService.update(this.candidate))
        .then((response) => {
          console.log(response);
          this.candidate = response.data;
          if (this.candidate.applications != null) {
            this.applications.data = this.candidate.applications;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isUpdating = false;
        });
    } else {
      firstValueFrom(this.candidateService.create(this.candidate))
        .then((response) => {
          console.log(response);
          this.candidate = response.data;
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

  deleteAction() {
    firstValueFrom(this.candidateService.delete(this.candidate))
      .then((response) => {
        console.log(response);
        this.router.navigate([`/main/candidates`]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {

      });
  }
}
