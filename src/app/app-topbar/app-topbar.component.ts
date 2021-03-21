import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrls: ['./app-topbar.component.css']
})
export class AppTopbarComponent implements OnInit {

  public items: MenuItem[];

  public itemsAccount: MenuItem[];

  public active

  constructor() { }

  ngOnInit(): void {
    
    this.items = [
      {
        label: 'Candidatos',
        icon: 'pi pi-fw pi-user-edit',
        // routerLink: ['/candidatos'],
        routerLink: ['#'],
      },
      {
        label: 'Recrutadores',
        icon: 'pi pi-fw pi-user',
        // routerLink: ['/recrutadores']
        routerLink: ['#']
      }
    ];

    this.itemsAccount = [
      {
        label: 'Minha Conta',
        icon: 'pi pi-user',
        command: () => this.goToUserAccount()
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];

  }

  public logout(){

    console.log('efetuar logout');
  }

  public goToUserAccount(){

    console.log('acessar a conta do usuario');
  }

}
