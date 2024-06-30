import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ManagerFiltersForm } from 'src/app/core/interfaces/manager.interfaces';

@Component({
  selector: 'app-filers',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  readonly maxDate = new Date();
  readonly form: FormGroup<ManagerFiltersForm> = inject(MAT_DIALOG_DATA);

  clear(): void {
    this.form.reset({
      username: '',
      firstname: '',
      lastname: '',
      totalSalesFrom: '',
      totalSalesTo: '',
      dateRegisteredRange: { start: '', end: '' },
    });
  }
}
