import { Injectable } from '@angular/core';
import { StyleManagerService } from './style-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themes = [
    /*0*/'bootstrap4-dark-blue',
    /*1*/'bootstrap4-light-blue',
    /*2*/'bootstrap4-dark-purple',
    /*3*/'bootstrap4-light-purple',
    /*4*/'md-dark-indigo',
    /*5*/'md-light-indigo',
    /*6*/'md-dark-deeppurple',
    /*7*/'md-light-deeppurple'
  ]  

  private darkTheme:string = this.themes[4];
  private lightTheme:string = this.themes[5];

  constructor(
    private styleManagerService: StyleManagerService
  ) { }

  public setTheme(theme: 'dark'|'light'){

    const themeHref = `assets/themes/${theme === 'light' ?this.lightTheme :this.darkTheme}/theme.css`;

    const logo = `assets/images/logo-${theme}.png`;

    this.styleManagerService.setStyle('app-theme', themeHref);

    this.changeLogo(logo);

    console.log('set tema', theme === 'light' ?this.lightTheme :this.darkTheme);
  }

  private changeLogo(src: string){
    (<HTMLImageElement> this.getLinkElementForKey('app-logo')).src = src; 
  }

  private getLinkElementForKey(key: string){
    return document.getElementById(key);
  }

}