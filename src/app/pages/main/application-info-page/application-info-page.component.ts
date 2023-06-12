import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {ApplicationService} from 'src/app/services/application.service';
import {CandidateService} from 'src/app/services/candidate.service';
import {LookUpService} from 'src/app/services/look-up.service';
import {PositionService} from 'src/app/services/position.service';
import {Application} from 'src/models/Application';
import {Candidate} from 'src/models/Candidate';
import {Position} from 'src/models/Position';

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

    this.form = this.fb.group({
      description: new FormControl(this.application.description, [Validators.required]),
      status: new FormControl(this.application.status, [Validators.required]),
      rejectionReason: new FormControl(this.application.rejectionReason)
    });

  }

  async ngOnInit(): Promise<void> {
    await firstValueFrom(this.positionService.getAll()).then((response) => {
      this.positions.data = response.data;
    });

    await firstValueFrom(this.candidateService.getAll()).then((response) => {
      this.candidates.data = response.data;
    });
    var id = this.actRoute.snapshot.paramMap.get('id');

    if (id == null || undefined) {
      this.isInserting = true;
      this.isUpdating = true;
    } else {
      this.isUpdating = false;
      this.isInserting = false;

      await firstValueFrom(this.applicationService.get(Number.parseInt(id))).then((response) => {
        this.application = response.data;
      });

      let candidate = this.candidates.data.find((candidate) => {
        return candidate.id == this.application.candidate?.id;
      });
      let position = this.positions.data.find((position) => {
        return position.id == this.application.position?.id;
      });

      this.application.candidate = candidate;
      this.application.position = position;

      this.candidates.data = [candidate!];
      this.positions.data = [position!];
      this.candidates.connect();
      this.positions.connect();
    }



  }

  editAction() {
    this.isUpdating = true;

    this.form = this.fb.group({
      description: new FormControl(this.application.description, [Validators.required]),
      status: new FormControl(this.application.status, [Validators.required]),
      rejectionReason: new FormControl(this.application.rejectionReason, [Validators.required]),
    });
  }

  insertAction() {
    if(this.application.candidate) this.fillCandidate(this.application.candidate);

    if(this.application.position) this.fillPosition(this.application.position!);
    let applicationForm: Application = {
      id: this.application.id,
      candidate: this.application.candidate,
      position: this.application.position,
      description: this.form.value.description,
      status: this.form.value.status,
      rejectionReason: this.form.value.rejectionReason,
    }
    console.log(applicationForm);

    if (!this.isInserting) {
      firstValueFrom(this.applicationService.update(applicationForm))
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
      applicationForm.position = this.positionSelectionModel.selected[0];
      applicationForm.candidate = this.candidateSelectionModel.selected[0];
      this.fillCandidate(applicationForm.candidate!);
      this.fillPosition(applicationForm.position!);
      firstValueFrom(this.applicationService.create(applicationForm))
        .then((response) => {
          console.log(response);
          this.application = response.data;
          this.router.navigate([`/main/applications/${response.data.id}`]);
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

  private fillPosition(position: Position) {
    position.applications = [];
    position.localization = {id: 0, name: ""};
    position.rol = {id: 0, name: ""};
    position.subRol = {id: 0, name: ""};
    position.area = {id: 0, name: ""};
    position.project = {id: 0, name: ""};
    position.status = {id: 0, name: ""};
  }

  private fillCandidate(candidate: Candidate) {
    candidate.applications = [];
    candidate.contactMethod = {id: 0, name: ""};
    candidate.status = {id: 0, name: ""};
  }

  deleteAction() {
    firstValueFrom(this.applicationService.delete(this.application)).then(r =>
      this.router.navigate(['/main/applications']));
  }
}
