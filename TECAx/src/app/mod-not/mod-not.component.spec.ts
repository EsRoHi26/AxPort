import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModNotComponent } from './mod-not.component';

describe('ModNotComponent', () => {
  let component: ModNotComponent;
  let fixture: ComponentFixture<ModNotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModNotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModNotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
