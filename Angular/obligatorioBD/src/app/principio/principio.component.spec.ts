import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipioComponent } from './principio.component';

describe('PrincipioComponent', () => {
  let component: PrincipioComponent;
  let fixture: ComponentFixture<PrincipioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrincipioComponent]
    });
    fixture = TestBed.createComponent(PrincipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
