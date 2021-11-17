import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { MessagesComponent } from './messages/messages.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerInterceptor } from './components/interceptor/Spinner.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

  // El módulo HttpClientInMemoryWebApiModule intercepta solicitudes HTTP
    // y devuelve respuestas de servidor simuladas.
    // Eliminarlo cuando un servidor real esté listo para recibir solicitudes.
    // El módulo encargado del servidor simulado
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    //Se está proveyendo el interceptor diciéndole la clase en la que implementé mi interceptor
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
    SpinnerComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }