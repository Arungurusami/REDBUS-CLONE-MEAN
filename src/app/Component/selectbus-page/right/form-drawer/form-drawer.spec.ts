import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDrawer } from './form-drawer';

describe('FormDrawer', () => {
  let component: FormDrawer;
  let fixture: ComponentFixture<FormDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDrawer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDrawer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
