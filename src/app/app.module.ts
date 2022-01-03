import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { LoginComponent } from './componentes/auth/login/login.component';
import { RegistroComponent } from './componentes/auth/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuPrincipalComponent } from './componentes/menu-principal/menu-principal.component';
import { ErroresFormularioComponent } from './componentes/auth/errores-formulario/errores-formulario.component';
import { AltaVendeHumosComponent } from './componentes/auth/alta-vende-humos/alta-vende-humos.component';
import { AuthInterceptor } from './interceptores/auth.interceptor';
import { CardsVendehumosComponent } from './componentes/cards-vendehumos/cards-vendehumos.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    LoginComponent,
    RegistroComponent,
    MenuPrincipalComponent,
    ErroresFormularioComponent,
    AltaVendeHumosComponent,
    CardsVendehumosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
