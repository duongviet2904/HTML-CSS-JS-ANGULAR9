import { Injectable } from '@angular/core';
import { Employee, lstEm } from '../data.employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  public lstEm = lstEm;

  public selectedEm !:Employee;

  constructor() { }

}
