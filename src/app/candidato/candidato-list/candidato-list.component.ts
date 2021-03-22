import { Component, OnInit, ViewChild } from '@angular/core';
import { Column } from 'src/app/core/api/column';
import { CandidatoService } from "../candidato.service";
import { PageNavigationService } from "@adalimana/ajlng/src/lib/api";
import { ConfirmationService } from 'primeng/api';
import { ListPageService } from 'src/app/core/api/list-page.service';
import { CoreListPageComponent } from 'src/app/core/core-list-page/core-list-page.component';

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
  public habilidadeOptions: any[] = [];
  public selectedHabilidades: any[] = [];

  @ViewChild('listPage', {static: false}) listPage: CoreListPageComponent;

  constructor(
    private candidatoService: CandidatoService,
    private confirmationService: ConfirmationService,
    private listPageService: ListPageService
  ) { }

  ngOnInit(): void {
    
    this.loading = false
    this.inicializeOptions();

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
    
    if(this.selectedHabilidades?.length > 0){
      parameters += (parameters === '') ? '?' : '&'; 
      parameters += `filters[habilidades]=${this.selectedHabilidades.join('|')}`;
    }
    
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

  public applyFilters(){
    //faz com que a table atualize e assim o component
    //ListPage dispara metodo updateTable, o qual retorna
    //os parametros (paginacao) setados da tabela
    this.listPage.table.filter(null, null, null);
  }

  private inicializeOptions(){

    this.candidatoService
        .getHabilidades()
        .subscribe(
          response => this.habilidadeOptions = response
        );
  }

}