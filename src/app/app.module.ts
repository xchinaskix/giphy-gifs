import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { GifFrameComponent } from './gif-frame/gif-frame.component';
import { GifService } from './gif.service';
import { FavoritesComponent } from './favorites/favorites.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { UploadProgressComponent } from './upload-progress/upload-progress.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard.service';

const appRoutes: Routes = [
  { path: '', component: MainComponent},
  { path: 'fav', component: FavoritesComponent, canActivate: [AuthGuard]},
  { path: 'auth', component: AuthComponent},
  { path: '404', component: PageNotFoundComponent},
  { path: '**', redirectTo: '404'}
];

@NgModule({
  declarations: [
    AppComponent,
    GifFrameComponent,
    FavoritesComponent,
    MainComponent,
    HeaderComponent,
    AuthComponent,
    UploadProgressComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GifService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
