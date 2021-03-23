import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleManagerService {


  setStyle(id: string, href: string) {
    this.getLinkElementForKey(id).setAttribute("href", href);
  }

  removeStyle(id: string) {
    const existingLinkElement = this.getExistingLinkElementByKey(id);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }

  private getLinkElementForKey(id: string) {
    return this.getExistingLinkElementByKey(id) || this.createLinkElementWithKey(id);
  }

  private getExistingLinkElementByKey(id: string) {
    return document.head.querySelector(
      `link[rel="stylesheet"]#${id}`
    );
  }

  private createLinkElementWithKey(id: string) {
    const linkEl = document.createElement("link");
    linkEl.setAttribute("rel", "stylesheet");
    linkEl.id = id;
    document.head.appendChild(linkEl);
    return linkEl;
  }
}