import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { MatNativeDateModule } from '@angular/material/core';
import { StateModule } from './store/state.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './environment/environment';
import { AngularFireModule } from '@angular/fire/compat';

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(appRoutes),
      HttpClientModule,
      BrowserModule,
      BrowserAnimationsModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient],
        },
      }),
      StoreModule.forRoot({}, {}),
      EffectsModule.forRoot({}),
      StoreDevtoolsModule.instrument({
        name: 'Sales Manager',
        maxAge: 25,
        logOnly: environment.production,
      }),
      MatNativeDateModule,
      StateModule,
      AngularFireModule.initializeApp(environment.firebaseConfig)
    ),
  ],
}).catch((err) => console.error(err));
