import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreFormPageComponent } from './core-form-page.component';

describe('CoreFormPageComponent', () => {
  let component: CoreFormPageComponent;
  let fixture: ComponentFixture<CoreFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreFormPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
