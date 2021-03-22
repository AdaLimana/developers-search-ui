import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Column } from 'src/app/core/api/column';
import { ListPageService } from 'src/app/core/api/list-page.service';
import { RecrutadorService } from '../recrutador.service';

@Component({
  selector: 'app-recrutador-list',
  templateUrl: './recrutador-list.component.html',
  styleUrls: ['./recrutador-list.component.css']
})
export class RecrutadorListComponent implements OnInit {

  public columns :Column[] = [
    {field: 'email', header: 'Email', type: 'text'},
    {field: 'created', header: 'CRIADO', type: 'datetime'},
    {field: 'updated', header: 'ATUALIZADO', type: 'datetime'}
  ];

  public data: any[] = [];
  public totalRecords: number = 3;
  public loading: boolean = true;
  public blocked: boolean = false;

  constructor(
    private recrutadorService: RecrutadorService,
    private confirmationService: ConfirmationService,
    private listPageService: ListPageService
  ) { }

  ngOnInit(): void {
    
    this.loading = false

  }

  public create(){
    this.listPageService.openCreatePage('/recrutadores/create');
  }

  public edit(value: any){
    this.listPageService.openEditPage( value.id, '/recrutadores/update');
  }

  public delete(value: any){
    this.confirmationService.confirm(
      {
        message: 'Você tem certeza que deseja excluir o recrutador '+ value.email,
        header: 'Confirmar Exclusão',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
          this.recrutadorService.delete(value.id)
              .subscribe(
                response => {
                  this.listPageService.showSuccessMessage("Recrutador removido com sucesso");
                  this.getData();
                },
                error => {
                  this.listPageService.showErrorMessage(error.error);
                }
              );
        }
      }
    );
  }

  public getData(parameters: string = ''){
    
    this.loading = true;
    this.recrutadorService.getAll(parameters)
        .subscribe(
          response => {
            this.data = response.data;
            this.totalRecords = response.totalRecords;
            this.loading = false;
          },
          error => {
            this.listPageService.showErrorMessage(error.error);
            this.loading = false;
          }
        );
  }

}