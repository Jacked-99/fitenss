import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBasePageComponent } from './product-base-page.component';

describe('ProductBasePageComponent', () => {
  let component: ProductBasePageComponent;
  let fixture: ComponentFixture<ProductBasePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductBasePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductBasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
