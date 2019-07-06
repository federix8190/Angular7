import { GraficoTestComponent } from './../grafico-test/grafico-test.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AuthGuardService } from '../../services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
    ,  canActivate: [AuthGuardService]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
