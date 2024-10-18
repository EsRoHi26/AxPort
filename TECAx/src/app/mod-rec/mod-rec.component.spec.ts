import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModRecComponent } from './mod-rec.component';

describe('ModRecComponent', () => {
  let component: ModRecComponent;
  let fixture: ComponentFixture<ModRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModRecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
