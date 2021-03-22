import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ListPageService {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  public openCreatePage(route: string){
    this.changeRoute(route);
  }

  public openEditPage(id: number, route: string){
    this.changeRoute(`${route}/${id}`);
  }

  public openViewPage(id: number, route: string){
    this.changeRoute(`${route}/${id}`);
  }

  public showSuccessMessage(messages :string|string[]){
    
    if(Array.isArray(messages)){
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
    else{
      this.messageService.add(
        {
          key: 'tst',
          severity: 'success',
          summary: 'Sucesso',
          detail: messages
        }
      );
    }

  }

  public showErrorMessage(messages :string|string[]){
    
    if(Array.isArray(messages)){
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
    else{
      this.messageService.add(
        {
          key: 'tst',
          severity: 'error',
          summary: 'Algo deu errado',
          detail: messages
        }
      );
    }

  }

  private changeRoute(route: string){
    
    const currentRoute = this.route.snapshot['_routerState']['url'];

    const url = this.router.createUrlTree(
                  [route],
                  {queryParams: {returnUrl: currentRoute}}
                );

    this.router.navigateByUrl(url);
  }

}