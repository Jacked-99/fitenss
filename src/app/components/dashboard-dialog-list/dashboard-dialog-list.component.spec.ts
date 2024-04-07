import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDialogListComponent } from './dashboard-dialog-list.component';

describe('DashboardDialogListComponent', () => {
  let component: DashboardDialogListComponent;
  let fixture: ComponentFixture<DashboardDialogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDialogListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardDialogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
