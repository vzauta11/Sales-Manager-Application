import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectProducts,
  selectProductsPageState,
  selectProductsSold,
} from './products.selector';
import { concatLatestFrom } from '@ngrx/effects';
import { map } from 'rxjs';

@Injectable()
export class ProductsFacade {
  private readonly store = inject(Store);

  private readonly products$ = this.store.select(selectProducts).pipe(
    concatLatestFrom(() => this.store.select(selectProductsPageState)),
    map(([products]) => products)
  );

  getProducts() {
    return this.products$;
  }

  private readonly productsSold$ = this.store.select(selectProductsSold).pipe(
    concatLatestFrom(() => this.store.select(selectProductsPageState)),
    map(([productsSold]) => productsSold)
  );

  getProductsSold() {
    return this.productsSold$;
  }
}
