import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoEnergy } from './eco-energy';

describe('EcoEnergy', () => {
  let component: EcoEnergy;
  let fixture: ComponentFixture<EcoEnergy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcoEnergy],
    }).compileComponents();

    fixture = TestBed.createComponent(EcoEnergy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
