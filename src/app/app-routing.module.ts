import { FormsPageComponent } from './components/forms-page/forms-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import {UsuarioListComponent} from './components/usuarios/usuario-list.component';
import {RolListComponent} from './components/roles/rol-list.component';
import {UsuarioEditComponent} from './components/usuarios/usuario-edit.component';
import {LoginComponent} from './login/login.component';
import {UsuarioRolAsigComponent} from './components/usuarios/usuario-rol-asig.component';
import {ConcursoListComponent} from './components/parametricas/concurso/concurso-list.component';
import {ElegiblesListComponent} from './components/elegibles/elegibles-list.component';
import {ModalidadListComponent} from './components/parametricas/modalidad/modalidad-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuardService] },
  /*
  { path: 'crear-usuario', component: CrearUsuarioComponent },
  { path: 'crear-usuario/:id', component: CrearUsuarioComponent },
  */
  { path: 'login', component: LoginComponent},
  {
    path: 'dashboard',
    loadChildren: './components/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'configuraciones',
    children: [
      { path: 'usuarios', component: UsuarioListComponent, canActivate: [AuthGuardService], },
      { path: 'usuarios/nuevo', component: UsuarioEditComponent, canActivate: [AuthGuardService], },
      { path: 'usuarios/:username/editar', component: UsuarioEditComponent, canActivate: [AuthGuardService] },
      { path: 'usuarios/:username/asignar/roles', component: UsuarioRolAsigComponent, canActivate: [AuthGuardService] },
      { path: 'roles', component: RolListComponent, canActivate: [AuthGuardService], },
      /*{ path: 'crear-persona', component: CrearPersonaComponent, canActivate: [AuthGuardService], },
      { path: 'crear-usuario', component: CrearUsuarioComponent, canActivate: [AuthGuardService] },
      { path: 'crear-usuario/:id', component: CrearUsuarioComponent, canActivate: [AuthGuardService] },
      { path: 'forms', component: FormsPageComponent, canActivate: [AuthGuardService]},*/
      // { path:'grafico-test', component:GraficoTestComponent },
    ]
  },
  {
    path: 'base',
    loadChildren: './components/base/base.module#BaseModule'
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {
    path: 'convocatorias',
    children: [
      { path: 'concursos', component: ConcursoListComponent, canActivate: [AuthGuardService], },
      { path: 'elegibles', component: ElegiblesListComponent, canActivate: [AuthGuardService], },

      /*{ path: 'crear-persona', component: CrearPersonaComponent, canActivate: [AuthGuardService], },
      { path: 'crear-usuario', component: CrearUsuarioComponent, canActivate: [AuthGuardService] },
      { path: 'crear-usuario/:id', component: CrearUsuarioComponent, canActivate: [AuthGuardService] },
      { path: 'forms', component: FormsPageComponent, canActivate: [AuthGuardService]},*/
      // { path:'grafico-test', component:GraficoTestComponent },
    ]
  },
  {
    path: 'parametricas',
    children: [
      { path: 'tipos-concurso', component: ConcursoListComponent, canActivate: [AuthGuardService], },
      { path: 'modalidades', component: ModalidadListComponent, canActivate: [AuthGuardService], },

      /*{ path: 'crear-persona', component: CrearPersonaComponent, canActivate: [AuthGuardService], },
      { path: 'crear-usuario', component: CrearUsuarioComponent, canActivate: [AuthGuardService] },
      { path: 'crear-usuario/:id', component: CrearUsuarioComponent, canActivate: [AuthGuardService] },
      { path: 'forms', component: FormsPageComponent, canActivate: [AuthGuardService]},*/
      // { path:'grafico-test', component:GraficoTestComponent },
    ]
  },
  /*{ path: 'convocatorias', component: ConvocatoriaListComponent, canActivate: [AuthGuardService]}*/

];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
