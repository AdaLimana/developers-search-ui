import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/core/api/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService extends BaseResourceService{

  constructor(
    protected injector: Injector
  ){
    super('api/candidatos', injector);
  }

  public getHabilidades(): Observable<any> {

    const url = 'api/habilidades';
    return  this.http
                .get(url)
                .pipe(
                    catchError(this.handleError),
                    take(1)
                );
  } 
}