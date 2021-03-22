import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecrutadorCreateComponent } from './recrutador-create.component';

describe('RecrutadorCreateComponent', () => {
  let component: RecrutadorCreateComponent;
  let fixture: ComponentFixture<RecrutadorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecrutadorCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecrutadorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
