import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SacarFechaComponent } from './sacar-fecha.component';

describe('SacarFechaComponent', () => {
  let component: SacarFechaComponent;
  let fixture: ComponentFixture<SacarFechaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SacarFechaComponent]
    });
    fixture = TestBed.createComponent(SacarFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
