import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidatoService } from '../../candidato.service';

@Component({
  selector: 'candidato-form',
  templateUrl: './candidato-form.component.html',
  styleUrls: ['./candidato-form.component.css']
})
export class CandidatoFormComponent implements OnInit {

  @Input() public candidato: any = {};

  @Input() public formGroup: FormGroup;

  public habilidadeOptions: any[];

  constructor(
    private candidaroService: CandidatoService
  ) { }

  ngOnInit(): void {
    
    if(!this.formGroup.get('id')){
      this.inicializeFormGroup(this.formGroup, this.candidato);
    }

    this.inicializeOptions();
  }

  private inicializeFormGroup(formGroup: FormGroup, candidato: any): FormGroup{

    // id
    formGroup.addControl(
      'id',
      new FormControl(
        candidato.id ?? null,
        []
      )
    );
    
    // nome
    formGroup.addControl(
      'nome',
      new FormControl(
        candidato.nome ?? null,
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(2)
        ]
      )
    );

    // email
    formGroup.addControl(
      'email',
      new FormControl(
        candidato.email ?? null,
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.email
        ]
      )
    );

    //linkedin
    formGroup.addControl(
      'linkedin',
      new FormControl(
        candidato.linkedin ?? null,
        [
          Validators.required,
          Validators.maxLength(300),
          Validators.pattern('^(https:\\/\\/)?[a-z]{2,3}\\.linkedin\\.com\\/.*$')
        ]
      )
    );

    // idade
    formGroup.addControl(
      'idade',
      new FormControl(
        candidato.idade ?? null,
        [
          Validators.required,
          Validators.min(1)
        ]
      )
    );

    // habilidades
    formGroup.addControl(
      'habilidades',
      new FormControl(
        candidato.habilidades ?? null,
        [
          Validators.required
        ]
      )
    );

    return formGroup;
  }

  private inicializeOptions(){

    this.candidaroService
        .getHabilidades()
        .subscribe(
          response => this.habilidadeOptions = response
        )

  }

}