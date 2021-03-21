import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Column } from '../api/column';

@Component({
  selector: 'core-list-page',
  templateUrl: './core-list-page.component.html',
  styleUrls: ['./core-list-page.component.css']
})
export class CoreListPageComponent implements OnInit {

  @Input() public pageName: string;

  @Input() public columns: Column[] = [];

  @Input() public totalRecords: number;

  @Input() public loading: boolean;

  @Input() public disableCreate: boolean = false;

  @Input() public disableView: boolean = false;

  @Input() public disableEdit: boolean = false;

  @Input() public disableDelete: boolean = false;

  @Input() public externalActionTemplate: {class: string, icon: string, title: string};

  @Input() public set data(data: any[]){

    this.columns.forEach(
      (column) => {
        
        if(column.type === 'datetime' || column.type === 'date'){
          
          data.forEach(
            (element) => {
              element[column.field] = element[column.field] ? moment(element[column.field]) :null;
            }
          );
        }

        else if(column.type === 'select'){

          data.forEach(
            (element) => {
              element[column.field] = column.options.filter((option) => option.value === element[column.field])[0]?.label ?? undefined;
            }
          );
        }

      }
    );

    this._data = data;

  }

  @Output() public updateTable = new EventEmitter<string>();

  @Output() public create = new EventEmitter<any>();

  @Output() public edit = new EventEmitter<any>();

  @Output() public view = new EventEmitter<any>();

  @Output() public delete = new EventEmitter<any>();

  @Output() public externalAction = new EventEmitter<any>();

  @ViewChild('table', {static: false}) table: Table;

  @ContentChild(TemplateRef) columnTemplate: TemplateRef<any>;

  public get data(): any[]{
    return this._data;
  }

  public selectedItem: any;

  public showFilters: boolean = false;

  private parameters: string = '';
  private _data: any[];

  constructor() { }

  ngOnInit(): void {
  }

  public _updateTable(event: LazyLoadEvent){

    let parameters = '?';
    
    parameters += this.getPagination(event);
    // parameters += this.getSort(event);
    // parameters += this.getGlobalFilter(event);
    // parameters += this.getFilters(event);

    this.parameters = parameters;
    this.updateTable.emit(this.parameters);
  }

  public _create(){
    this.create.emit(null);
  }

  public _view(item: any){
    this.view.emit(item);
  }

  public _edit(item: any = undefined){
    this.edit.emit(item);
  }

  public _externalAction(item: any){
    this.externalAction.emit(item);
  }

  public _delete(item: any = undefined){
    this.delete.emit(item);
  }

  private getPagination(event: LazyLoadEvent): string{

    let parametros: string = '';
    let page: number = (event.first / event.rows) + 1;

    if(event.first !== undefined && event.first !== null && event.rows !== undefined && event.rows !== null){
      
      parametros = `pagination[page]=${page}&pagination[count]=${event.rows}`;
    }

    return parametros;
  }

}