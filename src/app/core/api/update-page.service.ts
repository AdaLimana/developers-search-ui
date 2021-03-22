import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UpdatePageService {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  public closePage(){
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigate([returnUrl]);
  }

  public showSuccessMessage(messages :string[]){
    
    messages.forEach(
      (message) => {
        this.messageService.add(
          {
            key: 'tst',
            severity: 'success',
            summary: 'Sucesso',
            detail: message
          }
        );
      }
    );    
  }

  public showErrorMessage(messages :string[]){
    
    messages.forEach(
      (message) => {
        this.messageService.add(
          {
            key: 'tst',
            severity: 'error',
            summary: 'Algo deu errado',
            detail: message
          }
        );
      }
    )
  }

  public openCreatePage(route: string){

    const currentReturnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    const url = this.router.createUrlTree(
      [route],
      {queryParams: {returnUrl: currentReturnUrl}}
    );

    this.router.navigateByUrl(url);
  }
}