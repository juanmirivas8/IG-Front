import { Component, OnInit } from '@angular/core';
import {LookUpService} from "../../../services/look-up.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Position} from "../../../../models/Position";
import {ActivatedRoute, Router} from "@angular/router";
import {SelectionModel} from "@angular/cdk/collections";
import {Candidate} from "../../../../models/Candidate";
import {Application} from "../../../../models/Application";
import {PositionService} from "../../../services/position.service";
import {firstValueFrom} from "rxjs";
import {CandidateService} from "../../../services/candidate.service";
import {ApplicationService} from "../../../services/application.service";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-position-info-page',
  templateUrl: './position-info-page.component.html',
  styleUrls: ['./position-info-page.component.scss']
})
export class PositionInfoPageComponent implements OnInit {

  applications: MatTableDataSource<Application> = new MatTableDataSource<Application>();
  candidates: MatTableDataSource<Candidate> = new MatTableDataSource<Candidate>();
  candidateSelectionModel = new SelectionModel<Candidate>(true, [], true);
  applicationSelectionModel = new SelectionModel<Application>(true, [], true);

  public isInserting: boolean = false;
  public isUpdating: boolean = true;

  public form: FormGroup = new FormGroup({});
  public position: Position = {};
  constructor(public lookUpService: LookUpService,private fb:FormBuilder,private actRoute:ActivatedRoute,
              private router:Router, private positionService: PositionService,private candidateService:CandidateService,
              private applicationService:ApplicationService) {

    this.form = this.fb.group({
      area: new FormControl(this.position.area,[Validators.required]),
      project: new FormControl(this.position.project,[Validators.required]),
      rol: new FormControl(this.position.rol,[Validators.required]),
      subRol: new FormControl(this.position.subRol,[Validators.required]),
      localization: new FormControl(this.position.localization,[Validators.required]),
      status: new FormControl(this.position.status,[Validators.required]),
      description: new FormControl(this.position.description,[Validators.required]),
      vacancies: new FormControl(this.position.vacancies,[Validators.required]),
      creationDate: new FormControl(this.position.creationDate,[Validators.required]),
      closingDate: new FormControl(this.position.closingDate)
    });


  }
  async ngOnInit(): Promise<void> {
    var id = this.actRoute.snapshot.paramMap.get('id');
    console.log(id);
    if(id == null||undefined){
      this.isInserting = true;
      this.isUpdating = true;
    }else{
      this.isUpdating = false;
      this.isInserting = false;
      await firstValueFrom(this.positionService.getById(Number.parseInt(id))).then((response)=>{
        this.position = response.data;
      })
    }
    await firstValueFrom(this.candidateService.getAll()).then((response)=>{
      this.candidates.data = response.data;
    });

    await firstValueFrom(this.applicationService.getAll()).then((response)=>{
      this.applications.data = response.data;
    });

    let applicationsOfCandidate = this.applications.data.filter((application)=>{
      return application.position?.id == this.position.id;
    });

    this.applications.data = applicationsOfCandidate;
    this.applications.connect();
  }

  editAction() {
    this.isUpdating = true;

    this.form = this.fb.group({
      area: new FormControl(this.position.area,[Validators.required]),
      project: new FormControl(this.position.project,[Validators.required]),
      rol: new FormControl(this.position.rol,[Validators.required]),
      subRol: new FormControl(this.position.subRol,[Validators.required]),
      localization: new FormControl(this.position.localization,[Validators.required]),
      status: new FormControl(this.position.status,[Validators.required]),
      description: new FormControl(this.position.description,[Validators.required]),
      vacancies: new FormControl(this.position.vacancies,[Validators.required]),
      creationDate: new FormControl(this.position.creationDate,[Validators.required]),
      closingDate: new FormControl(this.position.closingDate)
    });
  }

  insertAction() {
    this.position = {
      id: this.position.id,
      project: this.form.get("project")?.value,
      area: this.form.get("area")?.value,
      rol: this.form.get("rol")?.value,
      subRol: this.form.get("subRol")?.value,
      localization: this.form.get("localization")?.value,
      status: this.form.get("status")?.value,
      description: this.form.get("description")?.value,
      vacancies: this.form.get("vacancies")?.value,
      creationDate: this.form.get("creationDate")?.value,
      closingDate: this.form.get("closingDate")?.value,
      lastUpdate: new Date(),
      applications: this.applicationSelectionModel.selected
    }

    if(!this.isInserting){
      firstValueFrom(this.positionService.update(this.position))
        .then((response) => {
          console.log(response);
          this.position = response.data;
          if(this.position.applications!=null){
            this.applications.data = this.position.applications;
          }
        })
        .catch((error)=>{
          console.log(error);
        })
        .finally(()=>{
          this.isUpdating = false;
        });
    }else{
      firstValueFrom(this.positionService.create(this.position))
        .then((response) => {
          console.log(response);
          this.position = response.data;
          this.router.navigate([`/main/positions/${response.data.id}`]);
        })
        .catch((error)=>{
          console.log(error);
        })
        .finally(()=>{

        });
    }

  }

  compareId(c1: any, c2:any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  cancelAction() {
    this.isUpdating = false;
  }

  deleteAction() {
    firstValueFrom(this.positionService.delete(this.position))
      .then((response) => {
        console.log(response);
        this.router.navigate([`/main/positions`]);
      })
      .catch((error)=>{
        console.log(error);
      })
      .finally(()=>{

      });
  }
}
