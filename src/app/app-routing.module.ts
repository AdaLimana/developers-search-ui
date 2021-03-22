import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLoginComponent } from './app-login/app-login.component';
import { AppMainComponent } from './app-main/app-main.component';
import { CandidatoCreateComponent } from './candidato/candidato-create/candidato-create.component';
import { CandidatoListComponent } from './candidato/candidato-list/candidato-list.component';
import { CandidatoUpdateComponent } from './candidato/candidato-update/candidato-update.component';
import { RecrutadorCreateComponent } from './recrutador/recrutador-create/recrutador-create.component';
import { RecrutadorListComponent } from './recrutador/recrutador-list/recrutador-list.component';
import { RecrutadorUpdateComponent } from './recrutador/recrutador-update/recrutador-update.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AppMainComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: CandidatoListComponent},
      {path: 'candidatos', component: CandidatoListComponent},
      {path: 'candidatos/create', component: CandidatoCreateComponent},
      {path: 'candidatos/update/:id', component: CandidatoUpdateComponent},
      {path: 'recrutadores', component: RecrutadorListComponent},
      {path: 'recrutadores/create', component: RecrutadorCreateComponent},
      {path: 'recrutadores/update/:id', component: RecrutadorUpdateComponent},
    ]
  },
  { path: 'authentication', component: AppLoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
