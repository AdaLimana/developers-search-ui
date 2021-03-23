import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { AuthenticationService } from '../services/authentication.service';
import { RecurtadorSessionService } from '../services/recrutador-session.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrls: ['./app-topbar.component.css']
})
export class AppTopbarComponent implements OnInit {

  public items: MenuItem[];

  public itemsAccount: MenuItem[];

  public dark: boolean = false;

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
          routerLink: ['/recrutadores']
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
    private themeSercvice: ThemeService,
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
        routerLink: ['/recrutadores']
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

  public changeTheme(){

    this.dark = !this.dark;
    this.themeSercvice.setTheme(this.dark ?'dark' :'light');
  }

}
