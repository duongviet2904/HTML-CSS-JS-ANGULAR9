import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, Observable } from 'rxjs';
import { Product } from '../Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) { 

  }

  getProductsList(): Observable<any[]> {
    console.log(this.http.get(`${this.baseUrl}`));
    return  this.http.get<any[]>(`${this.baseUrl}products`);
  }

  getProductByCode(code: string): Observable<any> {
    return  this.http.get<any>(`${this.baseUrl}product/${code}`);
  }

  createProduct(product:  Product): any{
    return this.http.post(`${this.baseUrl}product`, product);
  }

  updateProduct(product : Product):any{
    console.log('call update func')
    this.http.post(`${this.baseUrl}update-product`, product)
    // debugger
    return this.http.post(`${this.baseUrl}update-product`, product).pipe(first()).subscribe(x => {console.log(x)});
  }

  deleteProduct(id: number):any{
    console.log('call delete func')
    this.http.post(`${this.baseUrl}delete-product/${id}`, id)
    // debugger
    return this.http.post(`${this.baseUrl}delete-product/${id}`, id).pipe(first()).subscribe(x => {console.log(x)});
  }
}
