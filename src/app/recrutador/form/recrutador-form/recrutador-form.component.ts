import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'recrutador-form',
  templateUrl: './recrutador-form.component.html',
  styleUrls: ['./recrutador-form.component.css']
})
export class RecrutadorFormComponent implements OnInit, OnDestroy {

  @Input() recrutador: any = {};

  @Input() public formGroup: FormGroup;

  private subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit(): void {

    if(!this.formGroup.get('id')){
      this.inicializeFormGroup(this.formGroup, this.recrutador);
    }
    
    this.observerFormControlValues();
  }

  ngOnDestroy(): void{
    this.subscriptions.forEach(subscription => subscription?.unsubscribe());
  }
 
  public getValues(): any{

    return this.formGroup.value;
  }

  private inicializeFormGroup(formGroup: FormGroup, recrutador: any): FormGroup{

    const isUpdate = recrutador.id !== undefined && recrutador.id !== null;

    //id
    formGroup.addControl(
      'id',
      new FormControl(
        recrutador.id ?? null,
        []
      )
    );

    //email
    formGroup.addControl(
      'email',
      new FormControl(
        recrutador.email ?? null,
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.email
        ]
      )
    );

    //password
    formGroup.addControl(
      'password',
      new FormControl(
        {
          value: null,
          disabled: isUpdate
        },
        [
          Validators.required,
          Validators.maxLength(300),
          Validators.minLength(8)
        ]  
      )
    );

    //passwordComparation
    formGroup.addControl(
      'passwordComparation',
      new FormControl(
        {
          value: null,
          disabled: isUpdate
        },
        [
          Validators.required,
        ]  
      )
    );

    //oldPassword
    formGroup.addControl(
      'oldPassword',
      new FormControl(
        {
          value: null,
          disabled: true
        },
        [
          Validators.required,
        ]  
      )
    );

    //newPassword
    formGroup.addControl(
      'newPassword',
      new FormControl(
        {
          value: null,
          disabled: true
        },
        [
          Validators.required,
        ]  
      )
    );

    //newPasswordComparation
    formGroup.addControl(
      'newPasswordComparation',
      new FormControl(
        {
          value: null,
          disabled: true
        },
        [
          Validators.required,
        ]  
      )
    );  

    //changePassword
    formGroup.addControl(
      'changePassword',
      new FormControl(
        {
          value: false,
          disabled: !isUpdate
        },
        []
      )
    );

    return formGroup;
  }

  private observerFormControlValues(){
    this.subscriptions.push(this.observerChangePassword());
  }

  private observerChangePassword(): Subscription{

    return this.formGroup.get('changePassword')
               .valueChanges.subscribe(
                  changePassword => {
                    if(changePassword){
                      this.formGroup.controls['oldPassword'].enable();
                      this.formGroup.controls['newPassword'].enable();
                      this.formGroup.controls['newPasswordComparation'].enable();
                    }
                    else{
                      this.formGroup.controls['oldPassword'].disable();
                      this.formGroup.controls['newPassword'].disable();
                      this.formGroup.controls['newPasswordComparation'].disable();
                    }
                  }
               ); 
  }

}