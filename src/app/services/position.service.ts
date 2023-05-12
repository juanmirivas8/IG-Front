import { Injectable } from '@angular/core';
import {Position} from "../../models/Position";

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor() { }

  public positions: Position[] = [{
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
    },
    {
      id: 2,
      project: { id: 2, name: "Project B" },
      area: { id: 2, name: "Area 2" },
      rol: { id: 2, name: "Role 2" },
      subRol: { id: 2, name: "Sub Role 2" },
      localization: { id: 2, name: "Localization 2" },
      status: { id: 2, name: "Status 2" },
      description: "Position description 2",
      vacancies: 1,
      creationDate: new Date(),
      closingDate: new Date(),
      lastUpdate: new Date()
    },
    {
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
    },
    {
      id: 2,
      project: { id: 2, name: "Project B" },
      area: { id: 2, name: "Area 2" },
      rol: { id: 2, name: "Role 2" },
      subRol: { id: 2, name: "Sub Role 2" },
      localization: { id: 2, name: "Localization 2" },
      status: { id: 2, name: "Status 2" },
      description: "Position description 2",
      vacancies: 1,
      creationDate: new Date(),
      closingDate: new Date(),
      lastUpdate: new Date()
    },
    {
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
    },
    {
      id: 2,
      project: { id: 2, name: "Project B" },
      area: { id: 2, name: "Area 2" },
      rol: { id: 2, name: "Role 2" },
      subRol: { id: 2, name: "Sub Role 2" },
      localization: { id: 2, name: "Localization 2" },
      status: { id: 2, name: "Status 2" },
      description: "Position description 2",
      vacancies: 1,
      creationDate: new Date(),
      closingDate: new Date(),
      lastUpdate: new Date()
    }]
}
