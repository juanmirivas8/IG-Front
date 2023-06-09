import { Component, OnInit } from '@angular/core';
import {LookUpService} from "../../../services/look-up.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Position} from "../../../../models/Position";


@Component({
  selector: 'app-position-info-page',
  templateUrl: './position-info-page.component.html',
  styleUrls: ['./position-info-page.component.scss']
})
export class PositionInfoPageComponent implements OnInit {
  public isInserting: boolean = false;
  public isUpdating: boolean = true;
  public form: FormGroup;
  public position: Position = new Position();
  constructor(public lookUpService: LookUpService,private fb:FormBuilder) {
    this.form = this.fb.group({
      area: new FormControl('',[Validators.required]),
      project: new FormControl('',[Validators.required]),
      rol: new FormControl('',[Validators.required]),
      subRol: new FormControl('',[Validators.required]),
      localization: new FormControl('',[Validators.required]),
      status: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      vacancies: new FormControl('',[Validators.required]),
      creationDate: new FormControl('',[Validators.required]),
      closingDate: new FormControl('')
    });
  }
  ngOnInit(): void {

  }

}
