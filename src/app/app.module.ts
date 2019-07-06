import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { InputsModule } from './inputs/inputs.module';
import { FormsPageComponent } from './components/forms-page/forms-page.component';
import { GraficosModule } from './graficos/graficos.module';
import { GraficoTestComponent } from './components/grafico-test/grafico-test.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { CrearPersonaComponent } from './components/crear-persona/crear-persona.component';
import { UsuarioEditComponent } from './components/usuarios/usuario-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SecuredHttpInterceptor } from './commons/keycloak/secured-http.interceptor';
import {UsuarioListComponent} from './components/usuarios/usuario-list.component';
import {RolListComponent} from './components/roles/rol-list.component';
import {RolEditComponent} from './components/roles/rol-edit.component';
import {LoginComponent} from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuardService } from './services/auth-guard.service';
import {LayoutComponent} from './components/layout/layout.component';
import {UsuarioRolAsigComponent} from './components/usuarios/usuario-rol-asig.component';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {ConfirmDialogService} from './services/confirm-dialog.service';
import {ConcursoListComponent} from './components/parametricas/concurso/concurso-list.component';
import {ElegiblesListComponent} from './components/elegibles/elegibles-list.component';
import {BlockUIModule, BlockUIService} from 'ng-block-ui';
import { ToastrModule } from 'ngx-toastr';
import {ModalidadListComponent} from './components/parametricas/modalidad/modalidad-list.component';
import {BlockuiHttpInterceptor} from './commons/blockui-http.interceptor';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    HomeComponent,
    UsuarioEditComponent,
    FormsPageComponent,
    GraficoTestComponent,
    CrearPersonaComponent,
    UsuarioListComponent,
    RolListComponent,
    RolEditComponent,
    LoginComponent,
    LayoutComponent,
    UsuarioRolAsigComponent,
    ConfirmDialogComponent,
    ConcursoListComponent,
    ElegiblesListComponent,
    ModalidadListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PerfectScrollbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InputsModule,
    GraficosModule,
    NgxChartsModule,
    Ng2SmartTableModule,
    SlimLoadingBarModule,
    BrowserAnimationsModule,
    NgbModule,
    BlockUIModule.forRoot(),
    ToastrModule.forRoot(),
    BlockUIModule.forRoot({message: 'Cargando...'})


  ],
  exports: [HeaderComponent, CrearPersonaComponent],
  providers: [
    AuthGuardService,
    {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    DatePipe,
    CookieService,
    BlockUIService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BlockuiHttpInterceptor,
      multi: true
    },

    ConfirmDialogService
  ],
  entryComponents: [ ConfirmDialogComponent  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
