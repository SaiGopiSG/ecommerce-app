import { Routes } from '@angular/router';

export const routes: Routes = [
 {
    path: '',
    loadChildren: () =>
      import('./features/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./features/cart/cart.module').then(m => m.CartModule)
  }

];
