import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';
import { MatCardModule } from "@angular/material/card";
import { Location } from '@angular/common';
import { Product } from '../../../models/product-model';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
 product!: Product;
  loading: boolean=true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private location: Location
  ) {

  }
ngOnInit() {
  const id = +this.route.snapshot.paramMap.get('id')!;
  this.productService.getProduct(id).subscribe({
    next: (p) => {
      this.product = p;
      this.loading = false;
    },
    error: (err) => {
      console.error('Failed to load product', err);
      this.loading = false;
    }
  });
}

  addToCart() {
  if (this.product) {
    this.cartService.addToCart(this.product);
    this.router.navigate(['/cart']);
  } else {
    console.warn('Product not loaded yet. Cannot add to cart.');
  }
}
   getStars(rating: number): string[] {
    const stars: string[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.25 && rating % 1 <= 0.75;
    const totalStars = 5;
    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }
    if (hasHalfStar) {
      stars.push('half');
    }
    while (stars.length < totalStars) {
      stars.push('empty');
    }
    return stars;
  }
  backToProducts(){
     this.location.back();
    // this.router.navigate([''])
  }


}
