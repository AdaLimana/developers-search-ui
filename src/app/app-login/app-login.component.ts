import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../services/authentication.service';
import { RecurtadorSessionService } from '../services/recrutador-session.service';

@Component({
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css'],
})
export class AppLoginComponent implements OnInit {

  public formGroup: FormGroup;

  public loading: boolean = false;

  public returnUrl;

  /**
   * Controla a exibição da senha no formulário
   */
  public hidePassword : boolean = true;

  public backgroundImage: string = '';

  @ViewChild('usernameInput') public usernameInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private authenticationService: AuthenticationService,
    private recrutadorSessionService: RecurtadorSessionService
  ){ }

  ngOnInit(): void {
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.formGroup = this.createFormGroup();
    this.backgroundImage = this.getBackgroundImage();
  }

  ngAfterViewInit () {

    this.usernameInput.nativeElement.focus();
  }

  public getValues(): any{

    return this.formGroup.value;
  }

  /**
   * Altera o typo do input da senha
   */
  public toogleFieldTypeInputPassword() {
    this.hidePassword = !this.hidePassword;
  }

  public submit(){

    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid){
      this.loading = true;
      this.authenticationService.login(this.formGroup.value)
          .subscribe(
            response => {
              this.loading = false;
              const recrutador = {
                  'email': this.formGroup?.controls?.username?.value ?? 'usuario',
                  'id': response?.id ?? null,
              };
              //Armazenar em local storage e dispara aviso de que o usuario foi alterado
              this.recrutadorSessionService.alterarRecrutador(recrutador);

              this.router.navigate([this.returnUrl])
            },
            error => {
              this.loading = false;
              this.messageService.add(
                {
                  key: 'tst',
                  severity: 'error',
                  summary: 'Algo deu errado',
                  detail: error.error
                }
              );
            }
        );
    }
  }

  private getBackgroundImage(){
    return  `url(assets/images/background-login-${1+Math.floor(Math.random()*7)}.jpg)`;
  }

  private createFormGroup(): FormGroup{

    const formGroup = new FormGroup({});

    //username
    formGroup.addControl(
      'username',
      new FormControl(
        null,
        [
          Validators.required
        ]
      )
    );

    //password
    formGroup.addControl(
      'password',
      new FormControl(
        null,
        [
          Validators.required,
        ]
      )
    );

    return formGroup;
  }

}