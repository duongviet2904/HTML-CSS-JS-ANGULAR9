import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../data.employee';
import { EmployeeServiceService } from '../Services/employee-service.service';

@Component({
  selector: 'app-edit-em',
  templateUrl: './edit-em.component.html',
  styleUrls: ['./edit-em.component.css']
})
export class EditEmComponent implements OnInit {


  public lstEm: Employee[];

  editForm = new FormGroup({
    username: new FormControl(this.emService.selectedEm.username, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/)]),
    fullname: new FormControl(this.emService.selectedEm.fullname,  [Validators.required, Validators.maxLength(200)]),
    password: new FormControl(this.emService.selectedEm.password, [Validators.required, Validators.maxLength(50), Validators.minLength(6)]),
    address: new FormControl(this.emService.selectedEm.address,[Validators.required, Validators.maxLength(500)]),
    age: new FormControl(this.emService.selectedEm.age,[Validators.required, Validators.pattern(/^.\d$/)]),
  });

  constructor(private emService: EmployeeServiceService, private router:Router) { 
    this.lstEm = emService.lstEm;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.editForm.valid){
      var em = new Employee();
      em.fullname = this.editForm.controls.fullname.value;
      em.username = this.editForm.controls.username.value;
      em.password = this.editForm.controls.password.value;
      em.address = this.editForm.controls.address.value;
      em.age = Number(this.editForm.controls.age.value);
      var index = this.lstEm.indexOf(this.emService.selectedEm);
      this.lstEm.splice(index, 1, em);
      this.router.navigateByUrl('');
    }
  }

}
