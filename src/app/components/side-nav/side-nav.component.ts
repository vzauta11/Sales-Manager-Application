import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from 'src/store/auth/auth.action';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    TranslateModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  private readonly store = inject(Store);

  logout(): void {
    this.store.dispatch(authActions.logoutUser());
  }
}
