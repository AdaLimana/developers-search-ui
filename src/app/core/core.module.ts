import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreListPageComponent } from './core-list-page/core-list-page.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';



@NgModule({
  declarations: [
    CoreListPageComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    CardModule
  ],
  exports: [
    CoreListPageComponent
  ]
})
export class CoreModule { }
