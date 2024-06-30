import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PRODUCTS_FEATURE_KEY, ProductsPageState } from './products.reducer';

export const selectProductsPageState =
  createFeatureSelector<ProductsPageState>(PRODUCTS_FEATURE_KEY);

export const selectProducts = createSelector(
  selectProductsPageState,
  (state) => state.products
);

export const selectProductsSold = createSelector(
  selectProductsPageState,
  (state) => state.productsSold
);
