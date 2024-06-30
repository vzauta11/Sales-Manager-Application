import { FormControl, FormGroup } from "@angular/forms";

export interface ManagerFiltersForm {
    username: FormControl<string | null>;
    firstname: FormControl<string | null>;
    lastname: FormControl<string | null>;
    dateRegisteredRange: FormGroup<DateRegisteredRange>;
    totalSalesFrom: FormControl<string | null>;
    totalSalesTo: FormControl<string | null>;
  }
  
  interface DateRegisteredRange {
    start: FormControl<string | null>;
    end: FormControl<string | null>;
  }
  
  export interface Manager {
    id?: string;
    username: string;
    firstname: string;
    lastname: string;
    dateRegistered: string;
    totalSales: string;
  }