import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injector } from '@angular/core';

export abstract class BaseResourceService{

  protected http: HttpClient;

  constructor(
    protected apiPath: string,
    protected injector: Injector
  ){
    this.http = injector.get(HttpClient);
  }

  /**
   * Função para chamada da API de GET List de um recurso especifico
   * @param parameters parameters de paginação e count.
   * Se nada for informado o valor padrão '?pagination[page]=1&pagination[count]=10' será utilizado
   */
  public getAll(parameters: string = '?pagination[page]=1&pagination[count]=10'): Observable<any> {

    const url = this.apiPath + parameters;
    return  this.http
                .get(url)
                .pipe(
                    catchError(this.handleError),
                    take(1)
                );
  }

  /**
   * Chamada direta a uma api qualquer, com a requisição do tipo HTTP GET
   * @param url API completa  a ser requisitada
   */
  public get(url: string): Observable<any> {
    
    return  this.http
                .get(url)
                .pipe(
                    catchError(this.handleError),
                    take(1)
                );
  }

  /**
   * Chamada ao GET ID  de um determinado recurso, via requisição HTTP GET, de acordo com id informado
   * @param id do recurso a ser retornado
   */
  public getById(id: number): Observable<any> {
    
    const url = `${this.apiPath}/${id}`;

    return  this.http
                .get(url)
                .pipe(
                    catchError(this.handleError),
                    take(1)
                );
  }

  /**
   * Chamada genérica para criação de um recurso - requisição HTTP POST - CREATE do tipo application/json
   * @param resource dados a serem enviados
   */
  public create(resource: any): Observable<any> {
    
    return  this.http
                .post(this.apiPath, resource)
                .pipe(
                    catchError(this.handleError),
                    take(1)
                );
  }

  /**
   * Chamada genérica para atualização de um recurso - requisição HTTP PUT - UPDATE do tipo application/json
   * @param data dados do recurso a serem encaminhados para a atulizacao
   */
  public update(resource: any): Observable<any> {
    
    const url = `${this.apiPath}/${resource.id}`;

    return  this.http
                .put(url, resource)
                .pipe(
                    catchError(this.handleError),
                    take(1)
                );
  }

  /**
   * Chamada genérica para exclusão de um recurso - requisição HTTP DELETE com base em uma id
   * @param id identificação do recurso a ser excluído
   */
  public delete(id: number): Observable<any> {
    
    const url = `${this.apiPath}/${id}`;

    return  this.http
                .delete(url)
                .pipe(
                    catchError(this.handleError),
                    take(1)
                );
  }

  protected handleError(error: any): Observable<any>{
    console.log("ERRO NA REQUISICAO => ", error);
    return throwError(error);
  }

}