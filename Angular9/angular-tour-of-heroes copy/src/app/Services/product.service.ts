import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8000/products';

  constructor(private http: HttpClient) { 

  }

  getProductsList(): Observable<any> {
    console.log(this.http.get(`${this.baseUrl}`));
    return  this.http.get(`${this.baseUrl}`);
  }

  createProduct(product:  Product): any{
    return this.http.post(`${this.baseUrl}`, product);
  }

  updateProduct(id: number, value: any):Observable<any>{
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteProduct(id: number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
