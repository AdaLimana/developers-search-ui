import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/core/api/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class RecrutadorService extends BaseResourceService{

  constructor(
    protected injector: Injector
  ){
    super('api/recrutadores', injector);
  }
}