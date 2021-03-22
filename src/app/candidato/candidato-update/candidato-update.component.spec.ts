import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoUpdateComponent } from './candidato-update.component';

describe('CandidatoUpdateComponent', () => {
  let component: CandidatoUpdateComponent;
  let fixture: ComponentFixture<CandidatoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatoUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
