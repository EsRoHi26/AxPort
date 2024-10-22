import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecursoComponent } from './add-recurso.component';

describe('AddRecursoComponent', () => {
  let component: AddRecursoComponent;
  let fixture: ComponentFixture<AddRecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRecursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
