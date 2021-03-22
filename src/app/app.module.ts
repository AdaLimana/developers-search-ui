import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { InputErrorMessageModule } from '@adalimana/ajlng/src/lib/input-error-message';
import { IsRequiredModule } from '@adalimana/ajlng/src/lib/is-required';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { EqualsFormControlsModule } from '@adalimana/ajlng/src/lib/equals-form-controls'


import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppTopbarComponent } from './app-topbar/app-topbar.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppMainComponent } from './app-main/app-main.component';
import { CandidatoListComponent } from './candidato/candidato-list/candidato-list.component';
import { CandidatoFormComponent } from './candidato/form/candidato-form/candidato-form.component';
import { CandidatoCreateComponent } from './candidato/candidato-create/candidato-create.component';
import { CandidatoUpdateComponent } from './candidato/candidato-update/candidato-update.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { RecrutadorUpdateComponent } from './recrutador/recrutador-update/recrutador-update.component';
import { RecrutadorFormComponent } from './recrutador/form/recrutador-form/recrutador-form.component';
import { RecrutadorListComponent } from './recrutador/recrutador-list/recrutador-list.component';
import { RecrutadorCreateComponent } from './recrutador/recrutador-create/recrutador-create.component';


@NgModule({
  declarations: [
    AppComponent,
    AppTopbarComponent,
    AppFooterComponent,
    AppMainComponent,
    CandidatoListComponent,
    CandidatoFormComponent,
    CandidatoCreateComponent,
    CandidatoUpdateComponent,
    AppLoginComponent,
    RecrutadorUpdateComponent,
    RecrutadorFormComponent,
    RecrutadorListComponent,
    RecrutadorCreateComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MenubarModule,
    MenuModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    InputErrorMessageModule,
    IsRequiredModule,
    InputTextModule,
    MultiSelectModule,
    CheckboxModule,
    EqualsFormControlsModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
