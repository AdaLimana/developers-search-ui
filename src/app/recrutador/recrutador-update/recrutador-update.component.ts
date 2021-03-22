import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UpdatePageService } from 'src/app/core/api/update-page.service';
import { RecrutadorService } from '../recrutador.service';

@Component({
  templateUrl: './recrutador-update.component.html',
  styleUrls: ['./recrutador-update.component.css']
})
export class RecrutadorUpdateComponent implements OnInit {

  public recrutador: any;

  public saving: boolean = false;
  public loading: boolean = true;

  public formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recrutadorService: RecrutadorService,
    private updatePageService: UpdatePageService
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({});
    this.getRecrutador();
  }

  public getRecrutador(){

    const id = +this.route.snapshot.paramMap.get('id');

    this.recrutadorService.getById(id)
        .subscribe(
          response => {
            this.recrutador = response;
            this.loading = false;
          },
          error => {
            this.loading = false;
            this.updatePageService.showErrorMessage(error.error);
          }
        )
  }

  public save(){

      this.formGroup.markAllAsTouched();

      if(this.formGroup.valid){

        const values = this.formGroup.value;
        this.saving = true;
        this.recrutadorService.update(values)
            .subscribe(
              response => {
                this.updatePageService.showSuccessMessage(['Recrutador atualizado com sucesso']);
                this.recrutadorService.getById(response.id)
                    .subscribe(
                      response => {
                        this.recrutador = response;
                        this.formGroup = new FormGroup({});
                        this.saving = false;
                      },
                      error => {
                        this.saving = false;
                        this.updatePageService.showErrorMessage(error.error)
                      }
                    )
              },
              error => {
                this.saving = false;
                this.updatePageService.showErrorMessage(error.error);
              }
            );
      }
      else{
        this.updatePageService.showErrorMessage(["Dados do formulário inválidos"])
      }
  }

  public saveAndClose(){

    this.formGroup.markAllAsTouched();

    if(this.formGroup.valid){

      const values = this.formGroup.value;
      this.saving = true;

      this.recrutadorService.update(values)
          .subscribe(
            response => {
              this.saving = false;
              this.updatePageService.showSuccessMessage(['Recrutador atualizado com sucesso']);
              this.updatePageService.closePage();
            },
            error => {
              this.saving = false;
              this.updatePageService.showErrorMessage(error.error);
            }
          );
    }
    else{
      this.updatePageService.showErrorMessage(["Dados do formulário inválidos"])
    }
  }

  public close(){
    this.updatePageService.closePage();
  }

}