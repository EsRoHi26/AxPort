import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolPenComponent } from './sol-pen.component';

describe('SolPenComponent', () => {
  let component: SolPenComponent;
  let fixture: ComponentFixture<SolPenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolPenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolPenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
