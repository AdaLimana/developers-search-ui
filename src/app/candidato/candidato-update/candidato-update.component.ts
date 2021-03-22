import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UpdatePageService } from 'src/app/core/api/update-page.service';
import { CandidatoService } from '../candidato.service';

@Component({
  selector: 'candidato-update',
  templateUrl: './candidato-update.component.html',
  styleUrls: ['./candidato-update.component.css']
})
export class CandidatoUpdateComponent implements OnInit {

  public candidato: any;

  public saving: boolean = false;
  public loading: boolean = true;

  public formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private candidatoService: CandidatoService,
    private updatePageService: UpdatePageService
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({});
    this.getCandidato();
  }

  public getCandidato(){

    const id = +this.route.snapshot.paramMap.get('id');

    this.candidatoService.getById(id)
        .subscribe(
          response => {
            this.candidato = response;
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
        this.candidatoService.update(values)
            .subscribe(
              response => {
                this.updatePageService.showSuccessMessage(['Candidato atualizado com sucesso']);
                this.candidatoService.getById(response.id)
                    .subscribe(
                      response => {
                        this.candidato = response;
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

      this.candidatoService.update(values)
          .subscribe(
            response => {
              this.saving = false;
              this.updatePageService.showSuccessMessage(['Candidato atualizado com sucesso']);
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
