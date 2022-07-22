import { Component, Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee, lstEm } from '../data.employee';
import { EmployeeServiceService } from '../Services/employee-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../Product';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-add-em',
  templateUrl: './add-em.component.html',
  styleUrls: ['./add-em.component.css']
})
export class AddEmComponent implements OnInit {

  public check = 0;
  pro: Product = new Product();

  addForm = new FormGroup({
    product_code: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]),
    product_name: new FormControl('',  [Validators.required, Validators.maxLength(200), Validators.pattern(/^[a-zA-Z ]+$/)]),
    product_color: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z ]+$/)]),
    product_price: new FormControl('',[Validators.required, Validators.pattern(/^\d+$/)]),
  });
  constructor(private router: Router, private service: ProductService) {
  }

  ngOnInit(): void {
    this.check = 0;
  }

  onSubmit(){
    if(this.addForm.valid){
      var pro = new Product();
      pro.product_code = this.addForm.controls.product_code.value;
      pro.product_name = this.addForm.controls.product_name.value;
      pro.product_color = this.addForm.controls.product_color.value;
      pro.product_price = Number(this.addForm.controls.product_price.value);
      this.service.createProduct(pro).subscribe((data: string) => {
        alert(data.toString());
        this.pro = new Product();
      }, 
        (      error: any) => alert(error));
      this.check = 0;
      this.router.navigateByUrl('');
    }else{
      this.check = 1;
    }
  }
}
