import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../data.employee';
import { EditEmComponent } from '../edit-em/edit-em.component';
import { EmployeeServiceService } from '../Services/employee-service.service';
import { AgGridModule } from 'ag-grid-angular';
import { CheckboxSelectionCallbackParams, CheckboxSelectionComponent, ColDef, ColGroupDef, GridOptions, GridReadyEvent, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { Observable, reduce } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ButtonComponent } from '../button/button.component';
import { Product } from '../Product';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public lstEm: Employee[];

  rowDataClicked1!: Product;
  rowDataClicked2 = {};

  public checkboxSelection = function (params: CheckboxSelectionCallbackParams) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
    };
  public headerCheckboxSelection = function (
      params: HeaderCheckboxSelectionCallbackParams
    ) {
      // we put checkbox on the name if we are not doing grouping
      return params.columnApi.getRowGroupColumns().length === 0;
    };

  public rowSelection: 'single' | 'multiple' = 'multiple';

  public rowGroupPanelShow = 'always';
  public pivotPanelShow = 'always';

  public rowStyle = { background: 'black' };

  public autoGroupColumnDef: ColDef = {
    headerName: 'Group',
    minWidth: 170,
    field: 'athlete',
    valueGetter: (params) => {
      if (params.node!.group) {
        return params.node!.key;
      } else {
        return params.data[params.colDef.field!];
      }
    },
    headerCheckboxSelection: true,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true,
    },
  };

  public columnDefs : (ColDef | ColGroupDef)[] = [
    // { field: 'username', sortable: true, filter: true, checkboxSelection: this.checkboxSelection, headerCheckboxSelection: this.headerCheckboxSelection},
    // { field: 'fullname', sortable: true, filter: true, },
    // { field: 'password', sortable: true, filter: true},
    // { field: 'address', sortable: true, filter: true},
    // { field: 'age', sortable: true, filter: true, type: 'numberColumn'}
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
  ];

  public defaultColDef: ColDef = {
    // set the default column width
    minWidth: 150,
    // make every column editable
    editable: true,
    // make every column use 'text' filter by default
    // filter: 'agTextColumnFilter',
    // enable floating filters by default
    floatingFilter: true,
    // make columns resizable
    resizable: true,

    flex: 1,

    enableRowGroup: true,
    enablePivot: true
  };
  constructor(private service: EmployeeServiceService, private router : Router, private http: HttpClient) {
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

  public rowData$!: Observable<any[]>;

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.http
      .get<any[]>('http://localhost:8000/products');
  }

  onBtnClick1(e: any) {
    this.rowDataClicked1 = e.rowData;
    alert( this.rowDataClicked1.product_id);
  }
  
  onBtnClick2(e: any) {
    this.rowDataClicked2 = e.rowData;
  }
}
