import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecrutadorFormComponent } from './recrutador-form.component';

describe('RecrutadorFormComponent', () => {
  let component: RecrutadorFormComponent;
  let fixture: ComponentFixture<RecrutadorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecrutadorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecrutadorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
