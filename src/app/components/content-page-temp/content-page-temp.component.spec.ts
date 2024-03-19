import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPageTempComponent } from './content-page-temp.component';

describe('ContentPageTempComponent', () => {
  let component: ContentPageTempComponent;
  let fixture: ComponentFixture<ContentPageTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentPageTempComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentPageTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
