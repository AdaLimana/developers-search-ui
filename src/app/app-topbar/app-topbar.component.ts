import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { AuthenticationService } from '../services/authentication.service';
import { RecurtadorSessionService } from '../services/recrutador-session.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrls: ['./app-topbar.component.css']
})
export class AppTopbarComponent implements OnInit {

  public items: MenuItem[];

  public itemsAccount: MenuItem[];

  public set admin(admin: boolean){
    if(admin){
      this.items = [
        {
          label: 'Candidatos',
          icon: 'pi pi-fw pi-user-edit',
          routerLink: ['/candidatos']
        },
        {
          label: 'Recrutadores',
          icon: 'pi pi-fw pi-user',
          // routerLink: ['/recrutadores']
          routerLink: ['#']
        }
      ];
    }
    else{
      this.items = [
        {
          label: 'Candidatos',
          icon: 'pi pi-fw pi-user-edit',
          routerLink: ['/candidatos']
        },
      ];
    }  
  };

  constructor(
    private recrutadorSessionService: RecurtadorSessionService,
    private authenticationService: AuthenticationService,
		private route: ActivatedRoute,
		private router: Router
  ) { }

  ngOnInit(): void {
    
    this.items = [
      {
        label: 'Candidatos',
        icon: 'pi pi-fw pi-user-edit',
        routerLink: ['/candidatos']
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

    this.recrutadorSessionService
        .getRecrutador()
        .subscribe(
          value => {this.admin = value.id == '1'}
        )
  }

  public logout(){
    this.authenticationService
        .logout()
        .then(
          response => {
            localStorage.removeItem(this.recrutadorSessionService.RECRUTADOR_KEY);
            this.authenticationService.redirectToLogin();
          }
        )
  }

  public goToUserAccount(){

    const recrutador = this.recrutadorSessionService.getRecrutadorAtivoFromStorage();

    const returnUrl = this.route.snapshot['_routerState']['url'] ?? '/';

    this.router.navigateByUrl(
      this.router.createUrlTree(
        [`/recrutadores/update/${recrutador.id}`],
        {queryParams: {returnUrl: returnUrl}}
      )
    );

  }

}
