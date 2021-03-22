import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'core-form-page',
  templateUrl: './core-form-page.component.html',
  styleUrls: ['./core-form-page.component.css']
})
export class CoreFormPageComponent {

  @Input() public pageName: string;

  @Input() public loading: boolean;

  @Input() public saving: boolean;

  @Output() public save: EventEmitter<string>= new EventEmitter();

  @Output() public saveAndClose: EventEmitter<string> = new EventEmitter();

  @Output() public close: EventEmitter<string> = new EventEmitter();

  @ContentChild('form', {static: false}) formRef: TemplateRef<any>;

  constructor() { }
}