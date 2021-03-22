import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreatePageService } from 'src/app/core/api/create-page.service';
import { CandidatoService } from '../candidato.service';

@Component({
  templateUrl: './candidato-create.component.html',
  styleUrls: ['./candidato-create.component.css']
})
export class CandidatoCreateComponent implements OnInit {

  public saving: boolean = false;
  
  public formGroup: FormGroup;
  
  constructor(
    private candidatoService: CandidatoService,
    private createPageService: CreatePageService
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({});
  }

  public save(){

    this.formGroup.markAllAsTouched();

    if(this.formGroup.valid){

      const values = this.formGroup.value;

      this.saving = true;
      this.candidatoService.create(values)
          .subscribe(
            response => {
              this.saving = false;
              this.createPageService.showSuccessMessage(['Candidato criado com sucesso']);
              this.createPageService.openEditPage(response.id, '/candidatos/update');
            },
            error => {
              this.saving = false;
              this.createPageService.showErrorMessage(error.error);
            }
          );
    }
    else{
      this.createPageService.showErrorMessage(["Dados do formulário inválidos"])
    }
}

public saveAndClose(){

  this.formGroup.markAllAsTouched();

  if(this.formGroup.valid){

    const values = this.formGroup.value;

    this.saving = true;
    this.candidatoService.create(values)
        .subscribe(
          response => {
            this.saving = false;
            this.createPageService.showSuccessMessage(['Candidato criado com sucesso']);
            this.createPageService.closePage();
          },
          error => {
            this.saving = false;
            this.createPageService.showErrorMessage(error.error);
          }
        );
  }
  else{
    this.createPageService.showErrorMessage(["Dados do formulário inválidos"])
  }
}

public close(){
  this.createPageService.closePage();
}
}
