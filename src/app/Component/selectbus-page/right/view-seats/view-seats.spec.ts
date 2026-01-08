import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSeats } from './view-seats';

describe('ViewSeats', () => {
  let component: ViewSeats;
  let fixture: ComponentFixture<ViewSeats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSeats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSeats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
