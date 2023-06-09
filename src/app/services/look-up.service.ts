import { Injectable } from '@angular/core';
import {ApplicationStatus} from "../../models/ApplicationStatus";
import {Area} from "../../models/Area";
import {CandidateStatus} from "../../models/CandidateStatus";
import {ContactMethod} from "../../models/ContactMethod";
import {Localization} from "../../models/Localization";
import {PositionStatus} from "../../models/PositionStatus";
import {Project} from "../../models/Project";
import {Rol} from "../../models/Rol";
import {SubRol} from "../../models/SubRol";
import {Response} from "../../models/Response";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LookUpService {

  public applicationStatus: ApplicationStatus[] = [];
  public areas: Area[] = [];
  public candidateStatus: CandidateStatus[] = [];
  public contactMethods: ContactMethod[] = [];
  public localizations: Localization[] = [];
  public positionStatus: PositionStatus[] = [];
  public projects: Project[] = [];
  public roles: Rol[] = [];
  public subRoles: SubRol[] = [];
  constructor(private http:HttpClient) {
    this.loadApplicationStatus();
  }

  private loadApplicationStatus():void {
    let response = this.http.get<Response<any>>(`${environment.api.baseUrl}${environment.api.endpoints.lookUp}`);
    firstValueFrom(response).then(result => {
      if(!result.success){
        console.log(result.message);
        return;
      }
      result.data.forEach((data: { key: string; value: any; }) => {
        const key = data.key;
        const value = data.value;

        // Check the key and populate the corresponding array
        switch (key) {
          case "applicationStatus":
            this.applicationStatus = value.map((item:ApplicationStatus) => ({
              id: item.id,
              name: item.name
            }));
            break;
          case "areas":
            this.areas = value.map((item:Area) => ({
              id: item.id,
              name: item.name
            }));
            break;
          case "candidateStatus":
            this.candidateStatus = value.map((item:CandidateStatus) => ({
              id: item.id,
              name: item.name
            }));
            break;
          case "contactMethod":
            this.contactMethods = value.map((item:ContactMethod) => ({
              id: item.id,
              name: item.name
            }));
            break;
          case "localization":
            this.localizations = value.map((item:Localization) => ({
              id: item.id,
              name: item.name
            }));
            break;
          case "positionStatus":
            this.positionStatus = value.map((item:PositionStatus) => ({
              id: item.id,
              name: item.name
            }));
            break;
          case "projects":
            this.projects = value.map((item:Project) => ({
              id: item.id,
              name: item.name
            }));
            break;
          case "rol":
            this.roles = value.map((item:Rol) => ({
              id: item.id,
              name: item.name
            }));
            break;
          case "subRol":
            this.subRoles = value.map((item:SubRol) => ({
              id: item.id,
              name: item.name
            }));
            break;
          default:
            break;
        }
      });
    }).catch(error=>{
        console.log("Error during Http request");
        console.log(error);
      })
  }
}
