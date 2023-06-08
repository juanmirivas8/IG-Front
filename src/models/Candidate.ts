import {CandidateStatus} from "./CandidateStatus";
import {ContactMethod} from "./ContactMethod";
import {Application} from "./Application";

export class Candidate{

  public id?: number;
  public name?: string;
  public surname?: string;
  public description?: string;
  public status?:CandidateStatus;
  public contactMethod?: ContactMethod;
  public cvDate?: Date;
  public interviewDate?: Date;
  public technicalTestDate?: Date;
  public firstContactDate?: Date;
  public applications?: Application[];

  public static getKeys(): string[]{
    return ["id","name","surname","description","status","contactMethod","cvDate","interviewDate","technicalTestDate","firstContactDate"];
  }

}
