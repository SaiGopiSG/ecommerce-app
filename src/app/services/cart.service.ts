import { Injectable } from '@angular/core';
import { Product } from '../models/product-model';

@Injectable({ providedIn: 'root' })
export class CartService {
   private cart: Product[] = [];

  getCart(): Product[] {
    return [...this.cart];
  }

  addToCart(product: Product): void {
    this.cart.push(product);
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(p => p.id !== productId);
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }

  clearCart(): void {
    this.cart = [];
  }

}
