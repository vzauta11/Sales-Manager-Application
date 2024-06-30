import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddManageProductComponent } from 'src/app/components/add-manage-product/add-manage-product.component';
import {
  Subject,
  filter,
  switchMap,
  take,
  takeUntil,
  takeWhile,
  tap,
  withLatestFrom,
} from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { SellDialogComponent } from 'src/app/components/sell-dialog/sell-dialog.component';
import { Store } from '@ngrx/store';
import {
  addProduct,
  deleteProduct,
  initProducts,
  initProductsSold,
  sellProduct,
  updateProduct,
} from 'src/store/products/products.action';
import { ProductsFacade } from 'src/store/products/products.facade';
import { updateManager } from 'src/store/managers/managers.action';
import { ManagersFacade } from 'src/store/managers/managers.facade';
import { AuthStateFacade } from 'src/store/auth/auth.facade';
import { Manager } from 'src/app/core/interfaces/manager.interfaces';
import { ProductSold, Product } from 'src/app/core/interfaces/product.interfaces';
import { Unsubscribe } from 'src/app/core/abstracts/unsubscribe.abstract';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends Unsubscribe implements OnInit, AfterViewInit {
  private readonly dialog = inject(MatDialog);
  private readonly store = inject(Store);
  private readonly productsFacade = inject(ProductsFacade);
  private readonly managersFacade = inject(ManagersFacade);
  private _matPaginatorIntl = inject(MatPaginatorIntl);
  public translate = inject(TranslateService);
  private readonly authStateFacade = inject(AuthStateFacade);
  readonly currentUser$ = this.authStateFacade.getCurrentUser();
  readonly displayedColumns: string[] = [
    'title',
    'price',
    'quantity',
    'action',
  ];
  dataSource = new MatTableDataSource<ProductSold>([]);
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild('deleteDialog') deleteDialog?: TemplateRef<unknown>;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public managerData: Manager
  ) {
    super();
    if (managerData) {
      this.displayedColumns = ['title', 'price', 'quantity', 'salesDate'];
      this.store.dispatch(initProductsSold());
      this.productsFacade
        .getProductsSold()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) =>
            (this.dataSource.data = data.filter(
              (el) => el.username === managerData.username
            ))
        );
    } else {
      this.store.dispatch(initProducts());
      this.productsFacade
        .getProducts()
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => (this.dataSource.data = data));
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getFilterPredicate() {
    return (row: Product, filter: string) => {
      const matchFilter = [];
      const columnTitle = row.title;
      const customFilterTitle = columnTitle.toLowerCase().includes(filter);
      matchFilter.push(customFilterTitle);
      return matchFilter.every(Boolean);
    };
  }

  ngOnInit() {
    this.dataSource.filterPredicate = this.getFilterPredicate();
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
  openAddOrEditDialog(row?: Product) {
    if (this.managerData) return;
    const dialogRef = this.dialog.open(AddManageProductComponent, {
      data: row,
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result: Product) => {
        if (result) {
          if (result.id) {
            this.store.dispatch(updateProduct({ product: result }));
          } else {
            const body: Product = {
              title: result.title,
              quantity: result.quantity,
              price: result.price,
            };
            this.store.dispatch(addProduct({ product: body }));
          }
        }
      });
  }

  deleteProduct(row: Product) {
    const dialogRef = this.dialog.open(this.deleteDialog!);
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result: boolean) => {
        if (result) this.store.dispatch(deleteProduct({ product: row }));
      });
  }

  sellProduct(row: Product) {
    const dialogRef = this.dialog.open(SellDialogComponent, {
      data: row.quantity,
    });
    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter((result: number) => !!result),
        withLatestFrom(this.currentUser$),
        switchMap(([result, currentUser]) => {
          console.log(currentUser);
          const product = structuredClone(row);
          product.quantity = product.quantity - result;
          this.store.dispatch(
            sellProduct({
              productSold: {
                title: row.title,
                price: row.price,
                username: currentUser?.username, //this needs to be replaced with current user
                salesDate: new Date().toISOString(),
                quantity: result,
              },
            })
          );
          this.store.dispatch(updateProduct({ product }));

          return this.managersFacade.getManagers().pipe(
            tap((managers) => {
              const manager = structuredClone(
                managers.find((el) => el.username === currentUser?.username)
              );
              if (manager) {
                manager.totalSales = (
                  result * Number(product.price) +
                  Number(manager.totalSales)
                ).toString();
                this.store.dispatch(updateManager({ manager }));
              }
            }),
            takeWhile((managers) => managers.length < 1)
          );
        })
      )
      .subscribe();
  }
}
