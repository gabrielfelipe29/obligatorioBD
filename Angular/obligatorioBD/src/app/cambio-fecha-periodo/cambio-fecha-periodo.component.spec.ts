import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioFechaPeriodoComponent } from './cambio-fecha-periodo.component';

describe('CambioFechaPeriodoComponent', () => {
  let component: CambioFechaPeriodoComponent;
  let fixture: ComponentFixture<CambioFechaPeriodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CambioFechaPeriodoComponent]
    });
    fixture = TestBed.createComponent(CambioFechaPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
