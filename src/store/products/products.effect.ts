import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addProduct,
  addProductApiActions,
  deleteProduct,
  deleteProductApiActions,
  initProducts,
  initProductsApiActions,
  initProductsSold,
  initProductsSoldApiActions,
  sellProduct,
  sellProductApiActions,
  updateProduct,
  updateProductApiActions,
} from './products.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ProductsPageEffect {
  private readonly actions$ = inject(Actions);
  private readonly productsService = inject(ProductsService);
  private readonly snackbar = inject(MatSnackBar);

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initProducts),
      switchMap(() => this.productsService.getProducts()),
      map((products) =>
        initProductsApiActions.loadProductsSuccess({
          products,
        })
      ),
      catchError((error: string) => {
        console.log('error', error);
        return of(initProductsApiActions.loadProductsFailure({ error }));
      })
    );
  });

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addProduct),
      switchMap((action) => this.productsService.addProduct(action.product)),
      map((product) => {
        this.snackbar.open('success', 'dismiss');
        return addProductApiActions.addProductSuccess({ product });
      }),
      catchError((error: string) => {
        console.log('error', error);
        return of(addProductApiActions.addProductFailure({ error }));
      })
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateProduct),
      switchMap((action) => this.productsService.updateProduct(action.product)),
      map((product) => {
        this.snackbar.open('success', 'dismiss');
        return updateProductApiActions.updateProductSuccess({ product });
      }),
      catchError((error: string) => {
        console.log('error', error);
        return of(updateProductApiActions.updateProductFailure({ error }));
      })
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteProduct),
      switchMap((action) => this.productsService.deleteProduct(action.product)),
      map((product) => {
        this.snackbar.open('success', 'dismiss');
        return deleteProductApiActions.deleteProductSuccess({ product });
      }),
      catchError((error: string) => {
        console.log('error', error);
        return of(deleteProductApiActions.deleteProductFailure({ error }));
      })
    );
  });

  loadProductsSold$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initProductsSold),
      switchMap(() => this.productsService.getProductsSold()),
      map((productsSold) =>
        initProductsSoldApiActions.loadProductsSoldSuccess({
          productsSold,
        })
      ),
      catchError((error: string) => {
        console.log('error', error);
        return of(
          initProductsSoldApiActions.loadProductsSoldFailure({ error })
        );
      })
    );
  });

  sellProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sellProduct),
      switchMap((action) =>
        this.productsService.sellProduct(action.productSold)
      ),
      map((productSold) => {
        this.snackbar.open('success', 'dismiss');
        return sellProductApiActions.sellProductSuccess({ productSold });
      }),
      catchError((error: string) => {
        console.log('error', error);
        return of(sellProductApiActions.sellProductFailure({ error }));
      })
    );
  });
}
