import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateCalculationComponent } from './date-calculation.component';

describe('DateCalculationComponent', () => {
  let component: DateCalculationComponent;
  let fixture: ComponentFixture<DateCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateCalculationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
