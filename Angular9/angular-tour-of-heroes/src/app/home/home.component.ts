import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../data.employee';
import { EditEmComponent } from '../edit-em/edit-em.component';
import { EmployeeServiceService } from '../Services/employee-service.service';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { CheckboxSelectionCallbackParams, CheckboxSelectionComponent, ColDef, ColGroupDef, GridOptions, GridReadyEvent, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { Observable, reduce } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ButtonComponent } from '../button/button.component';
import { Product } from '../Product';
import { ProductService } from '../Services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('productGrid') grid!: AgGridAngular;
  
  public rowData!: Observable<any[]>;

  rowDataClicked1!: Product;
  rowDataClicked2!: Product;

  public rowSelection: 'single' | 'multiple' = 'multiple';

  public rowGroupPanelShow = 'always';
  public pivotPanelShow = 'always';

  public rowStyle = { background: 'black' };

  code!: string;
  public product!: Product;

  editForm = new FormGroup({
    product_id: new FormControl('',[Validators.required, Validators.pattern(/^\d+$/)]),
    product_code: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]),
    product_name: new FormControl('',  [Validators.required, Validators.maxLength(200), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]),
    product_color: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z ]+$/)]),
    product_price: new FormControl('',[Validators.required, Validators.pattern(/^\d+$/)]),
  });


  public columnDefs : (ColDef | ColGroupDef)[] = [
    { headerName: 'Code', field: 'product_code', sortable: true, filter: true},
    { headerName: 'Name', field: 'product_name', sortable: true, filter: true, },
    { headerName: 'Color', field: 'product_color', sortable: true, filter: true},
    { headerName: 'Price', field: 'product_price', sortable: true, filter: true},
    {headerName: 'Action', editable : false,
      cellRenderer: ButtonComponent,
      cellRendererParams: {
        onClick: this.onBtnClick1.bind(this),
        label: 'Edit'
      }
    },
    {headerName: 'Action', editable : false,
      cellRenderer: ButtonComponent,
      cellRendererParams: {
        onClick: this.onBtnClick2.bind(this),
        label: 'Delete'
      }
    },
  ];

  public defaultColDef: ColDef = {
    minWidth: 150,
    editable: true,
    floatingFilter: true,
    resizable: true,
    flex: 1,
    enableRowGroup: true,
    enablePivot: true,
  };
  constructor(private service: ProductService, private router : Router) {
  }

  ngOnInit(): void {
    // debugger
    this.reloadData();
  }

  reloadData(){
    this.rowData = this.service.getProductsList();
  }
  onBtnClick1(e: any) {
    // debugger
    this.rowDataClicked1 = e.rowData;
    // alert( this.rowDataClicked1.product_code);
      this.editForm.controls.product_id.setValue(this.rowDataClicked1.product_id!.toString());
      this.editForm.controls.product_code.setValue(this.rowDataClicked1.product_code);
      this.editForm.controls.product_name.setValue(this.rowDataClicked1.product_name);
      this.editForm.controls.product_color.setValue(this.rowDataClicked1.product_color);
      this.editForm.controls.product_price.setValue(this.rowDataClicked1.product_price!.toString());
      this.displayStyle = "block";
      this.ngOnInit();
    // this.router.navigate(['edit', this.rowDataClicked1.product_code]);
  }
  
  onBtnClick2(e: any) {
    // debugger
    this.rowDataClicked2 = e.rowData;
    console.log(this.rowDataClicked2)
    if(confirm("Are you sure to delete "+ e.rowData.product_code)) {
      // console.log("Implement delete functionality here");
      this.service.deleteProduct(Number(this.rowDataClicked2.product_id));
    }
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['']);
  }); 
  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
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
      this.displayStyle = "none";
      this.grid.api.refreshServerSide;
      // this.ngOnInit();
    }
  }


}
