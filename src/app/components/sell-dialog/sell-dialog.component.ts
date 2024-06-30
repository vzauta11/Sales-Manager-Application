import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sell-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sell-dialog.component.html',
  styleUrls: ['./sell-dialog.component.scss'],
})
export class SellDialogComponent {
  readonly minQuantity = 0;
  readonly maxQuantity: number = inject(MAT_DIALOG_DATA);
  quantity: FormControl<number | null> = new FormControl(null, [
    Validators.required,
    Validators.min(this.minQuantity),
    Validators.max(this.maxQuantity),
  ]);
}
