import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Product, ProductSold } from '../interfaces/product.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseUrl}/products`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.baseUrl}/products`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${environment.baseUrl}/products/${product.id}`,
      product
    );
  }
  deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(
      `${environment.baseUrl}/products/${product.id}`
    );
  }

  getProductsSold(): Observable<ProductSold[]> {
    return this.http.get<ProductSold[]>(`${environment.baseUrl}/productsSold`);
  }

  sellProduct(productSold: ProductSold): Observable<ProductSold> {
    return this.http.post<ProductSold>(
      `${environment.baseUrl}/productsSold`,
      productSold
    );
  }
}
