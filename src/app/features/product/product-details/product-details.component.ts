import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';
import { MatCardModule } from "@angular/material/card";
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private location: Location
  ) {

  }
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
   this.product = this.productService.getProduct(id).subscribe(p => (this.product = p));
   console.log(this.product);
   
  }
  addToCart() {
    this.cartService.addToCart(this.product);
    this.router.navigate(['/cart']);

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
