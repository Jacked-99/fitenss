import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggableSectionTempComponent } from './toggable-section-temp.component';

describe('ToggableSectionTempComponent', () => {
  let component: ToggableSectionTempComponent;
  let fixture: ComponentFixture<ToggableSectionTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggableSectionTempComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToggableSectionTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
