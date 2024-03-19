import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPageTempComponent } from './auth-page-temp.component';

describe('AuthPageTempComponent', () => {
  let component: AuthPageTempComponent;
  let fixture: ComponentFixture<AuthPageTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPageTempComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthPageTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
