import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private router:Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cart = this.cartService.getCart();
    // console.log('cart',this.cart);
    this.total = this.cartService.getTotal();
  }

  removeItem(id: number): void {
    this.cartService.removeFromCart(id);
    this.loadCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
  }
  backToProductDetails(){
   this.location.back();

  }
}
