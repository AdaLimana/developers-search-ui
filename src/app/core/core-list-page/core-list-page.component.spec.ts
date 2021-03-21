import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreListPageComponent } from './core-list-page.component';

describe('CoreListPageComponent', () => {
  let component: CoreListPageComponent;
  let fixture: ComponentFixture<CoreListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
