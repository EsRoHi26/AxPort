import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SydComponent } from './syd.component';

describe('SydComponent', () => {
  let component: SydComponent;
  let fixture: ComponentFixture<SydComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SydComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SydComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
