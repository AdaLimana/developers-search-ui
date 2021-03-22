import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/core/api/column';
import { CandidatoService } from "../candidato.service";
import { PageNavigationService } from "@adalimana/ajlng/src/lib/api";
import { ConfirmationService } from 'primeng/api';
import { ListPageService } from 'src/app/core/api/list-page.service';

@Component({
  selector: 'candidato-list',
  templateUrl: './candidato-list.component.html',
  styleUrls: ['./candidato-list.component.css']
})
export class CandidatoListComponent implements OnInit {

  public columns :Column[] = [
    {field: 'nome', header: 'NOME', type: 'text'},
    {field: 'idade', header: 'IDADE', type: 'number'},
    {field: 'habilidades', header: 'HABILIDADES', type: 'template'},
    {field: 'linkedin', header: 'LINKEDIN', type: 'text'}
  ];

  public data: any[] = [];
  public totalRecords: number = 3;
  public loading: boolean = true;
  public blocked: boolean = false;

  constructor(
    private candidatoService: CandidatoService,
    private confirmationService: ConfirmationService,
    private listPageService: ListPageService
  ) { }

  ngOnInit(): void {
    this.loading = false
  }

  public create(){
    this.listPageService.openCreatePage('/candidatos/create');
  }

  public edit(value: any){
    this.listPageService.openEditPage( value.id, '/candidatos/update');
  }

  public delete(value: any){
    this.confirmationService.confirm(
      {
        message: 'Você tem certeza que deseja excluir o candidato '+ value.nome,
        header: 'Confirmar Exclusão',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
          this.candidatoService.delete(value.id)
              .subscribe(
                response => {
                  this.listPageService.showSuccessMessage("Candidato removido com sucesso");
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
    this.candidatoService.getAll(parameters)
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
