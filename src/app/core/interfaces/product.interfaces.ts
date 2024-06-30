import { FormControl } from "@angular/forms";

export interface ProductForm {
    id: FormControl<string | null>;
    title: FormControl<string | null>;
    price: FormControl<string | null>;
    quantity: FormControl<number | null>;
  }
  export interface Product {
    id?: string;
    title: string;
    price: string;
    quantity: number;
  }

  export interface ProductSold extends Product {
    salesDate?: string;
    username?: string;
  }
  