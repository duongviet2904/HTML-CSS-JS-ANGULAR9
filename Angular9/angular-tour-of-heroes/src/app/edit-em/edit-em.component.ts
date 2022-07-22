import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map } from 'rxjs';
import { Employee } from '../data.employee';
import { Product } from '../Product';
import { EmployeeServiceService } from '../Services/employee-service.service';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-edit-em',
  templateUrl: './edit-em.component.html',
  styleUrls: ['./edit-em.component.css']
})
export class EditEmComponent implements OnInit {

  code!: string;
  public product!: Product;

  editForm = new FormGroup({
    product_id: new FormControl('',[Validators.required, Validators.pattern(/^\d+$/)]),
    product_code: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]),
    product_name: new FormControl('',  [Validators.required, Validators.maxLength(200), Validators.pattern(/^[a-zA-Z ]+$/)]),
    product_color: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z ]+$/)]),
    product_price: new FormControl('',[Validators.required, Validators.pattern(/^\d+$/)]),
  });

  constructor(private service: ProductService, private router:Router, private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.code = this.route.snapshot.params['code'];
    console.log(this.code)
    this.service.getProductByCode(this.code).pipe(first()).subscribe(pro => { 
      this.editForm.controls.product_id.setValue(pro.product_id);
      this.editForm.controls.product_code.setValue(pro.product_code);
      this.editForm.controls.product_name.setValue(pro.product_name);
      this.editForm.controls.product_color.setValue(pro.product_color);
      this.editForm.controls.product_price.setValue(pro.product_price);
    
    });
  }

  onSubmit(){
    if(this.editForm.valid){
      var pro = new Product();
      pro.product_id = Number(this.editForm.controls.product_id.value);
      pro.product_code = this.editForm.controls.product_code.value;
      pro.product_name = this.editForm.controls.product_name.value;
      pro.product_color = this.editForm.controls.product_color.value;
      pro.product_price = Number(this.editForm.controls.product_price.value);
      this.service.updateProduct(pro);
      this.router.navigateByUrl('');
    }
  }

}
