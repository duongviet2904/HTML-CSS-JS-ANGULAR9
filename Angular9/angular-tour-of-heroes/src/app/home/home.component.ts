import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../data.employee';
import { EditEmComponent } from '../edit-em/edit-em.component';
import { EmployeeServiceService } from '../Services/employee-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public lstEm: Employee[];

  constructor(private service: EmployeeServiceService, private router : Router) {
    this.lstEm = service.lstEm;
  }

  ngOnInit(): void {
  }

  rmEm(item: Employee){
    if(confirm("Bạn muốn xoá nhân viên này ?")){
      var x = this.lstEm.indexOf(item);
      this.lstEm.splice(x, 1);
    }

  }

  setlectEm(em: Employee){
    this.service.selectedEm = em;
    // console.log(this.service.selectedEm);
    this.router.navigateByUrl('edit');
  }

}
