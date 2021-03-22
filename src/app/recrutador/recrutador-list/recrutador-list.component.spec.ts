import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecrutadorListComponent } from './recrutador-list.component';

describe('RecrutadorListComponent', () => {
  let component: RecrutadorListComponent;
  let fixture: ComponentFixture<RecrutadorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecrutadorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecrutadorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
