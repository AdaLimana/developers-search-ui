import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner'

import { CoreListPageComponent } from './core-list-page/core-list-page.component';
import { CoreFormPageComponent } from './core-form-page/core-form-page.component';



@NgModule({
  declarations: [
    CoreListPageComponent,
    CoreFormPageComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    CardModule,
    ProgressSpinnerModule
  ],
  exports: [
    CoreListPageComponent,
    CoreFormPageComponent,
  ]
})
export class CoreModule { }
