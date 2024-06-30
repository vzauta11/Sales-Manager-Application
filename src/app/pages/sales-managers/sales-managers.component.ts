import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductsComponent } from '../products/products.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FiltersComponent } from 'src/app/components/filters/filters.component';
import { Subject, take, takeUntil } from 'rxjs';
import { formatISO } from 'date-fns';
import { getFilterPredicate } from './sales-managers.util';
import { Store } from '@ngrx/store';
import { initManagers } from 'src/store/managers/managers.action';
import { ManagersFacade } from 'src/store/managers/managers.facade';
import { Manager, ManagerFiltersForm } from 'src/app/core/interfaces/manager.interfaces';
import { Unsubscribe } from 'src/app/core/abstracts/unsubscribe.abstract';

@Component({
  selector: 'app-sales-managers',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    TranslateModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './sales-managers.component.html',
  styleUrls: ['./sales-managers.component.scss'],
})
export class SalesManagersComponent extends Unsubscribe
  implements OnInit, AfterViewInit 
{
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);
  private _matPaginatorIntl = inject(MatPaginatorIntl);
  public translate = inject(TranslateService);
  private readonly managersFacade = inject(ManagersFacade);
  readonly displayedColumns: string[] = [
    'username',
    'name',
    'surname',
    'dateRegistered',
    'totalSales',
  ];
  readonly dataSource = new MatTableDataSource<Manager>([]);
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  private form = new FormGroup<ManagerFiltersForm>({
    username: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    dateRegisteredRange: new FormGroup({
      start: new FormControl(''),
      end: new FormControl(''),
    }),
    totalSalesFrom: new FormControl('', Validators.min(0)),
    totalSalesTo: new FormControl('', Validators.min(0)),
  });

  filter(form: FormGroup<ManagerFiltersForm>) {
    console.log(form, form.value);
    const username = form.value.username?.toLowerCase();
    const name = form.value.firstname?.toLowerCase();
    const surname = form.value.lastname?.toLowerCase();
    const dateRegisteredRangeStart = form.value.dateRegisteredRange?.start
      ? formatISO(new Date(form.value.dateRegisteredRange?.start), {
          representation: 'date',
        })
      : '';
    const dateRegisteredRangeEnd = form.value.dateRegisteredRange?.end
      ? formatISO(new Date(form.value.dateRegisteredRange?.end), {
          representation: 'date',
        })
      : '';
    const totalSalesFrom = form.value.totalSalesFrom;
    const totalSalesTo = form.value.totalSalesTo;

    const filterValue =
      username +
      '$' +
      name +
      '$' +
      surname +
      '$' +
      dateRegisteredRangeStart +
      '$' +
      dateRegisteredRangeEnd +
      '$' +
      totalSalesFrom +
      '$' +
      totalSalesTo;
    this.dataSource.filter = filterValue.trim();
  }

  ngOnInit() {
    this.dataSource.filterPredicate = getFilterPredicate();
    this.store.dispatch(initManagers());
    this.managersFacade
      .getManagers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.dataSource.data = data));
  }

  ngAfterViewInit() {
    if (this.paginator) this.dataSource.paginator = this.paginator;
    this.translate.onLangChange.subscribe((event) => {
      this._matPaginatorIntl.itemsPerPageLabel =
        this.translate.instant('Items per page');
      this._matPaginatorIntl.nextPageLabel =
        this.translate.instant('Next page');
      this._matPaginatorIntl.previousPageLabel =
        this.translate.instant('Previous page');
      this._matPaginatorIntl.firstPageLabel =
        this.translate.instant('First page');
      this._matPaginatorIntl.lastPageLabel =
        this.translate.instant('Last page');
      this._matPaginatorIntl.changes.next();
    });
  }

  openDialog(row: Manager) {
    this.dialog.open(ProductsComponent, {
      data: row,
    });
  }

  openFilter() {
    const dialogRef = this.dialog.open(FiltersComponent, {
      data: this.form,
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result: FormGroup<ManagerFiltersForm>) => {
        if (result) {
          this.form = result;
          this.filter(result);
        }
      });
  }
}
