import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMainComponent } from './app-main/app-main.component';
import { CandidatoCreateComponent } from './candidato/candidato-create/candidato-create.component';
import { CandidatoListComponent } from './candidato/candidato-list/candidato-list.component';
import { CandidatoUpdateComponent } from './candidato/candidato-update/candidato-update.component';

const routes: Routes = [
  {
    path: '',
    component: AppMainComponent,
    children: [
      {path: '', component: CandidatoListComponent},
      {path: 'candidatos', component: CandidatoListComponent},
      {path: 'candidatos/create', component: CandidatoCreateComponent},
      {path: 'candidatos/update/:id', component: CandidatoUpdateComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
