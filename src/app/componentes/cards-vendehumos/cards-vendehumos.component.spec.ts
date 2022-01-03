import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsVendehumosComponent } from './cards-vendehumos.component';

describe('CardsVendehumosComponent', () => {
  let component: CardsVendehumosComponent;
  let fixture: ComponentFixture<CardsVendehumosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsVendehumosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsVendehumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
