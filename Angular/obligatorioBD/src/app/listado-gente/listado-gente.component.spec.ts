import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoGenteComponent } from './listado-gente.component';

describe('ListadoGenteComponent', () => {
  let component: ListadoGenteComponent;
  let fixture: ComponentFixture<ListadoGenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoGenteComponent]
    });
    fixture = TestBed.createComponent(ListadoGenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
