import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetialsPageComponent } from './product-detials-page.component';

describe('ProductDetialsPageComponent', () => {
  let component: ProductDetialsPageComponent;
  let fixture: ComponentFixture<ProductDetialsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetialsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductDetialsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
