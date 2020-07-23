import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../interface/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  BASE_URL:string = "http://localhost:3000/products";

  constructor(private http:HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}`);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.BASE_URL}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.BASE_URL}/create`, product);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.BASE_URL}/${id}`);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.BASE_URL}/${id}`, product);
  }
}
