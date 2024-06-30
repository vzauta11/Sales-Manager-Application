import { createAction, createActionGroup, props } from '@ngrx/store';
import { Product, ProductSold } from 'src/app/core/interfaces/product.interfaces';

export const initProducts = createAction('[Load Products] Init');

export const initProductsApiActions = createActionGroup({
  source: 'Products/Api',
  events: {
    'Load Products Success': props<{
      products: Product[];
    }>(),
    'Load Products Failure': props<{
      error: string;
    }>(),
  },
});

export const addProduct = createAction(
  '[Add] Product',
  props<{ product: Product }>()
);

export const addProductApiActions = createActionGroup({
  source: 'Product/Api',
  events: {
    'Add Product Success': props<{ product: Product }>(),
    'Add Product Failure': props<{ error: string }>(),
  },
});

export const updateProduct = createAction(
  '[Update] Product',
  props<{ product: Product }>()
);

export const updateProductApiActions = createActionGroup({
  source: 'Product/Api',
  events: {
    'Update Product Success': props<{ product: Product }>(),
    'Update Product Failure': props<{ error: string }>(),
  },
});

export const deleteProduct = createAction(
  '[Delete] Product',
  props<{ product: Product }>()
);

export const deleteProductApiActions = createActionGroup({
  source: 'Product/Api',
  events: {
    'Delete Product Success': props<{ product: Product }>(),
    'Delete Product Failure': props<{ error: string }>(),
  },
});

export const initProductsSold = createAction('[Load Products Sold] Init');

export const initProductsSoldApiActions = createActionGroup({
  source: 'Products Sold/Api',
  events: {
    'Load Products Sold Success': props<{
      productsSold: ProductSold[];
    }>(),
    'Load Products Sold Failure': props<{
      error: string;
    }>(),
  },
});

export const sellProduct = createAction(
  '[Sell] Product',
  props<{ productSold: ProductSold }>()
);

export const sellProductApiActions = createActionGroup({
  source: 'Product/Api',
  events: {
    'Sell Product Success': props<{
      productSold: ProductSold;
    }>(),
    'Sell Product Failure': props<{
      error: string;
    }>(),
  },
});
