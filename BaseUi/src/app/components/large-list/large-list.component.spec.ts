import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeListComponent } from './large-list.component';

describe('LargeListComponent', () => {
  let component: LargeListComponent;
  let fixture: ComponentFixture<LargeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LargeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
