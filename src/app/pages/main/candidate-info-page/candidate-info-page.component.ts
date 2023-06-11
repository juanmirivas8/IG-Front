import { Component, OnInit } from '@angular/core';
import {LookUpService} from "../../../services/look-up.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SelectionModel} from "@angular/cdk/collections";
import {Candidate} from "../../../../models/Candidate";
import {Application} from "../../../../models/Application";
@Component({
  selector: 'app-candidate-info-page',
  templateUrl: './candidate-info-page.component.html',
  styleUrls: ['./candidate-info-page.component.scss']
})
export class CandidateInfoPageComponent implements OnInit {
  candidateSelectionModel = new SelectionModel<Candidate>(true, [], true);
  applicationSelectionModel = new SelectionModel<Application>(true, [], true);

  public isInserting: boolean = false;
  public isUpdating: boolean = true;

  public form: FormGroup = new FormGroup({});
  public candidate: Candidate = {
    id: 1,
    name: "name",
    surname: "surname",
    description: "description",
    status:{ id: 1, name: "true" },
    contactMethod: { id: 1, name: "contactMethod" },
    cvDate: new Date(),
    interviewDate: new Date(),
    technicalTestDate: new Date(),
    firstContactDate: new Date(),
  };
  constructor(public lookUpService: LookUpService,private fb:FormBuilder,private actRoute:ActivatedRoute,
              private router:Router){
      var id = this.actRoute.snapshot.paramMap.get('id');
      console.log(id);
      if(id == null||undefined){
        this.isUpdating = false;
        this.isInserting = true;
      }else{
        this.isUpdating = false;
        this.isInserting = false;
        
      }
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl(this.candidate.name,[Validators.required]),
      surname: new FormControl(this.candidate.surname,[Validators.required]),
      description: new FormControl(this.candidate.description,[Validators.required]),
      status: new FormControl(this.candidate.status,[Validators.required]),
      contactMethod: new FormControl(this.candidate.contactMethod,[Validators.required]),
      cvDate: new FormControl(this.candidate.cvDate,[Validators.required]),
      interviewDate: new FormControl(this.candidate.interviewDate,[Validators.required]),
      technicalTestDate: new FormControl(this.candidate.technicalTestDate,[Validators.required]),
      firstContactDate: new FormControl(this.candidate.firstContactDate,[Validators.required]),
    });
  }

  editAction() {
    this.isInserting = false;
    this.isUpdating = true;
  }

  insertAction() {
    this.candidate = {
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

    if(this.isUpdating){
      this.isUpdating = false;
      this.isInserting = false;
    }else{
      this.isUpdating = false;
      this.isInserting = false;
      this.router.navigate(['/main/candidate/23']);
    }

  }

  compareId(c1: any, c2:any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
