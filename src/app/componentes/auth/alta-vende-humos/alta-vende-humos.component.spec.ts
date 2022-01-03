import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaVendeHumosComponent } from './alta-vende-humos.component';

describe('AltaVendeHumosComponent', () => {
  let component: AltaVendeHumosComponent;
  let fixture: ComponentFixture<AltaVendeHumosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaVendeHumosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaVendeHumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
