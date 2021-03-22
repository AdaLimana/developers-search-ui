import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecrutadorUpdateComponent } from './recrutador-update.component';

describe('RecrutadorUpdateComponent', () => {
  let component: RecrutadorUpdateComponent;
  let fixture: ComponentFixture<RecrutadorUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecrutadorUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecrutadorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
