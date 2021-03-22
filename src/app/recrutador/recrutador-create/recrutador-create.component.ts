import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreatePageService } from 'src/app/core/api/create-page.service';
import { RecrutadorService } from '../recrutador.service';

@Component({
  templateUrl: './recrutador-create.component.html',
  styleUrls: ['./recrutador-create.component.css']
})
export class RecrutadorCreateComponent implements OnInit {

  public saving: boolean = false;
  
  public formGroup: FormGroup;
  
  constructor(
    private recrutadorService: RecrutadorService,
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
      this.recrutadorService.create(values)
          .subscribe(
            response => {
              this.saving = false;
              this.createPageService.showSuccessMessage(['Recrutador criado com sucesso']);
              this.createPageService.openEditPage(response.id, '/recrutadores/update');
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
    this.recrutadorService.create(values)
        .subscribe(
          response => {
            this.saving = false;
            this.createPageService.showSuccessMessage(['Recrutador criado com sucesso']);
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