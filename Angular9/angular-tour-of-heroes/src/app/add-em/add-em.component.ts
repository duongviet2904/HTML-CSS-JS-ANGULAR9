import { Component, Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee, lstEm } from '../data.employee';
import { EmployeeServiceService } from '../Services/employee-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-em',
  templateUrl: './add-em.component.html',
  styleUrls: ['./add-em.component.css']
})
export class AddEmComponent implements OnInit {

  public lstEm: Employee[];

  addForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/)]),
    fullname: new FormControl('',  [Validators.required, Validators.maxLength(200)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(6)]),
    address: new FormControl('',[Validators.required, Validators.maxLength(500)]),
    age: new FormControl('',[Validators.required, Validators.pattern(/^.\d$/)]),
  });
  constructor(private router: Router, private emService: EmployeeServiceService) {
    this.lstEm = emService.lstEm;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.addForm.valid){
      var em = new Employee();
      em.fullname = this.addForm.controls.fullname.value;
      em.username = this.addForm.controls.username.value;
      em.password = this.addForm.controls.password.value;
      em.address = this.addForm.controls.address.value;
      em.age = Number(this.addForm.controls.age.value);
      this.lstEm.splice(this.lstEm.length, 1, em);
      this.router.navigateByUrl('');
    }
  }
}
