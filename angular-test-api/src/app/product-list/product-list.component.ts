import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { Product } from '../Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // products?: Observable<Product[]>;
  products!: Observable<any[]>;
  public columnDefs: ColDef[] = [
    { field: 'product_id', width: 150},
    { field: 'product_code', width: 150},
    { field: 'product_name', width: 150},
    { field: 'product_color', width: 150},
    { field: 'product_price', width: 150},
  ];
 
  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    // set the default column width
    minWidth: 150,
    // make every column editable
    editable: true,
    // make every column use 'text' filter by default
    // filter: 'agTextColumnFilter',
    // enable floating filters by default
    // floatingFilter: true,
    // make columns resizable
    resizable: true,

    flex: 1,

    // enableRowGroup: true,
    // enablePivot: true
  };
  constructor(private productService: ProductService,
    private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.reloadData();
    console.log(this.products);
  }

  reloadData() {
    this.products = this.productService.getProductsList();
  
  }

  // onGridReady(params: GridReadyEvent) {
  //   this.rowData$ = this.http
  //     .get<any[]>('http://localhost:8000/products');
  // }
}
