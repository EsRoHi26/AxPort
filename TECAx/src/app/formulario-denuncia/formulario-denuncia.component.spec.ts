import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDenunciaComponent } from './formulario-denuncia.component';

describe('FormularioDenunciaComponent', () => {
  let component: FormularioDenunciaComponent;
  let fixture: ComponentFixture<FormularioDenunciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioDenunciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioDenunciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
