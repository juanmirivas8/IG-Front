import {Candidate} from "./Candidate";
import {Position} from "./Position";
import {ApplicationStatus} from "./ApplicationStatus";

export class Application {

  id?: number;
  candidate?:Candidate;
  position?:Position
  status?:ApplicationStatus;
  rejectionReason?:string;
  description?:string;

  public static getKeys(): string[]{
    return ["id","candidate","position","status","rejectionReason","description"];
  }
}
