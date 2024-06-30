import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product, ProductForm } from 'src/app/core/interfaces/product.interfaces';

@Component({
  selector: 'app-add-manage-product',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    TranslateModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-manage-product.component.html',
  styleUrls: ['./add-manage-product.component.scss'],
})
export class AddManageProductComponent {
  readonly product?: Product = inject(MAT_DIALOG_DATA);
  readonly form = new FormGroup<ProductForm>({
    id: new FormControl(this.product?.id || null),
    title: new FormControl(this.product?.title || null, [
      Validators.required,
      Validators.pattern(
        /^(?:[a-zA-Z\d\s]+|[\u10A0-\u10FF\u2D00-\u2D2F\d\s]+)$/
      ),
    ]),
    price: new FormControl(this.product?.price || null, Validators.required),
    quantity: new FormControl(
      this.product?.quantity || null,
      Validators.required
    ),
  });
}
