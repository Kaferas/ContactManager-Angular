import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorNotFoundContactComponent } from './error-not-found-contact.component';

describe('ErrorNotFoundContactComponent', () => {
  let component: ErrorNotFoundContactComponent;
  let fixture: ComponentFixture<ErrorNotFoundContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorNotFoundContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorNotFoundContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
