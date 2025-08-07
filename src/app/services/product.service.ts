import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any[]>('/assets/products.json');
  }

  getProduct(id: number) {
    return this.getProducts().pipe(map(products => products.find(p => p.id === id)));
  }
}
