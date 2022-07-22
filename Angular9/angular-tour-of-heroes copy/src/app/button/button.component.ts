import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Product } from '../Product';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements ICellRendererAngularComp {

  params?: any;
  label: string | undefined;

  constructor() { }
  agInit(params: any): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event: any) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }

}
