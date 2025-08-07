import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../models/product-model';

@Component({
  selector: 'app-product-list',
  //  standalone: true,
  //  imports:[FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  searchTerm = '';
  selectedCategory = '';
  selectedPrice = '';
  selectedRating = '';
  sortBy = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedSort: string = '';

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;

      this.categories = [...new Set(this.products.map(p => p.category))];

      this.filteredProducts = [...this.products];
    });
  }

  getFilteredProducts() {
    let filtered = this.products;
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(term)
      );
    }
    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category.toLowerCase() === this.selectedCategory.toLowerCase());
    }
    if (this.selectedPrice) {
      filtered = filtered.filter(p => this.filterByPrice(p.price));
    }
    if (this.selectedRating) {
      filtered = filtered.filter(p => p.rating >= Number(this.selectedRating));
    }
    if (this.selectedSort === 'priceAsc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (this.selectedSort === 'priceDesc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }
    return filtered;
  }

  filterByPrice(price: number): boolean {
    switch (this.selectedPrice) {
      case 'low':
        return price < 500;
      case 'mid':
        return price >= 500 && price <= 2000;
      case 'high':
        return price > 2000;
      default:
        return true;
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

  view(id: number) {
    this.router.navigate(['/product', id]);
  }

}
