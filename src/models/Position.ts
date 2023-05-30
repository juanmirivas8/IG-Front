import {Project} from "./Project";
import {Area} from "./Area";
import {Rol} from "./Rol";
import {SubRol} from "./SubRol";
import {Localization} from "./Localization";
import {PositionStatus} from "./PositionStatus";
import {Application} from "./Application";

export class Position {
  public id?: number;
  public project?: Project;
  public area?: Area;
  public rol?:Rol;
  public subRol?:SubRol;
  public localization?:Localization;
  public status?: PositionStatus;
  public description?: string;
  public vacancies?: number;
  public creationDate?: Date;
  public closingDate?: Date;
  public lastUpdate?: Date;
  public applications?:Application[];

   public static getKeys(): string[]{
     return ["id","project","area","rol","subRol","localization","status","description","vacancies","creationDate","closingDate","lastUpdate"];
   }
}
