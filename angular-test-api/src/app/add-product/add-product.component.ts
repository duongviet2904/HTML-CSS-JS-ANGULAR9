import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  submitted = false;

  showFiller = false;

  addForm = new FormGroup({
    product_name: new FormControl('', Validators.required),
    product_color: new FormControl('',  Validators.required),
    product_price: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
  });
  
  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
  }

  newEmployee(): void {
    this.submitted = false;
  }

  save(){
    var newPro = new Product();
    newPro.product_name = this.addForm.controls.product_name.value;
    newPro.product_color = this.addForm.controls.product_color.value;
    newPro.product_price = Number(this.addForm.controls.product_price.value);

    this.productService.createProduct(newPro);
    this.router.navigateByUrl("");
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }
  
}
