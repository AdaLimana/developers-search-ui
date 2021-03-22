import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoCreateComponent } from './candidato-create.component';

describe('CandidatoCreateComponent', () => {
  let component: CandidatoCreateComponent;
  let fixture: ComponentFixture<CandidatoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
