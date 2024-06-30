import { createReducer, on } from '@ngrx/store';
import {
  addProductApiActions,
  deleteProductApiActions,
  initProductsApiActions,
  initProductsSoldApiActions,
  sellProductApiActions,
  updateProductApiActions,
} from './products.action';
import { Product, ProductSold } from 'src/app/core/interfaces/product.interfaces';

export const PRODUCTS_FEATURE_KEY = 'productsPage';

export interface ProductsPageState {
  products: Product[];
  productsSold: ProductSold[];
}

export const initialProductsPageState: ProductsPageState = {
  products: [],
  productsSold: [],
};

export const productsPageReducer = createReducer(
  initialProductsPageState,
  on(
    initProductsApiActions.loadProductsFailure,
    initProductsSoldApiActions.loadProductsSoldFailure,
    sellProductApiActions.sellProductFailure,
    addProductApiActions.addProductFailure,
    updateProductApiActions.updateProductFailure,
    deleteProductApiActions.deleteProductFailure,
    (state, action): ProductsPageState => {
      return {
        ...state,
      };
    }
  ),
  on(
    initProductsApiActions.loadProductsSuccess,
    (state, action): ProductsPageState => {
      return {
        ...state,
        products: action.products,
      };
    }
  ),
  on(
    initProductsSoldApiActions.loadProductsSoldSuccess,
    (state, action): ProductsPageState => {
      return {
        ...state,
        productsSold: action.productsSold,
      };
    }
  ),
  on(
    sellProductApiActions.sellProductSuccess,
    (state, action): ProductsPageState => {
      return {
        ...state,
        productsSold: [...state.productsSold, action.productSold],
      };
    }
  ),
  on(
    addProductApiActions.addProductSuccess,
    (state, action): ProductsPageState => {
      return {
        ...state,
        products: [...state.products, action.product],
      };
    }
  ),
  on(
    updateProductApiActions.updateProductSuccess,
    (state, action): ProductsPageState => {
      const newProductsState = state.products.map((el) =>
        el.id === action.product.id ? action.product : el
      );
      return {
        ...state,
        products: [...newProductsState],
      };
    }
  ),
  on(
    deleteProductApiActions.deleteProductSuccess,
    (state, action): ProductsPageState => {
      const newProductsState = state.products.filter(
        (el) => el.id !== action.product.id
      );
      return {
        ...state,
        products: [...newProductsState],
      };
    }
  )
);
