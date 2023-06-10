import { Component, OnInit } from '@angular/core';
import {LookUpService} from "../../../services/look-up.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Position} from "../../../../models/Position";
import {ActivatedRoute, Router} from "@angular/router";
import {SelectionModel} from "@angular/cdk/collections";
import {Candidate} from "../../../../models/Candidate";
import {Application} from "../../../../models/Application";


@Component({
  selector: 'app-position-info-page',
  templateUrl: './position-info-page.component.html',
  styleUrls: ['./position-info-page.component.scss']
})
export class PositionInfoPageComponent implements OnInit {

  candidateSelectionModel = new SelectionModel<Candidate>(true, [], true);
  applicationSelectionModel = new SelectionModel<Application>(true, [], true);

  public isInserting: boolean = false;
  public isUpdating: boolean = true;

  public example = "Example";
  public form: FormGroup = new FormGroup({});
  public position: Position = {
    id: 1,
    project: { id: 1, name: "Project A" },
    area: { id: 1, name: "Area 1" },
    rol: { id: 1, name: "Role 1" },
    subRol: { id: 1, name: "Sub Role 1" },
    localization: { id: 1, name: "Localization 1" },
    status: { id: 2, name: "Status 2" },
    description: "Position description 1",
    vacancies: 2,
    creationDate: new Date(),
    closingDate: new Date(),
    lastUpdate: new Date(),
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
        //call service to get position by id
      }
  }
  ngOnInit(): void {
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

  editAction() {
    this.isInserting = false;
    this.isUpdating = true;
  }

  insertAction() {
    this.position = {
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
    console.log(this.position);

    this.isInserting = false;
    this.isUpdating = false;

    if(this.isUpdating){
      this.isUpdating = false;
      this.isInserting = false;
    }else{
      this.isUpdating = false;
      this.isInserting = false;
      this.router.navigate(['/main/positions/23']);
    }

  }
  toggleEditMode() {
  this.editMode = !this.editMode;
  
  if (this.editMode) {
    // Acciones cuando se activa el modo de edición (cambiar el texto del botón, etc.)
    this.isInserting=true
  } else {
    // Acciones cuando se desactiva el modo de edición (cambiar el texto del botón, etc.)
    this.isUpdating=false
  }
}

  compareId(c1: any, c2:any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
