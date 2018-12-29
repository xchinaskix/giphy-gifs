import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { GifFrameComponent } from './gif-frame/gif-frame.component';
import { HttpClientModule } from '@angular/common/http';
import { GifService } from './gif.service';
import { FavoritesComponent } from './favorites/favorites.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';

const appRoutes: Routes = [
  { path: 'fav', component: FavoritesComponent},
  { path: '', component: MainComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    GifFrameComponent,
    FavoritesComponent,
    MainComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GifService],
  bootstrap: [AppComponent]
})
export class AppModule { }
