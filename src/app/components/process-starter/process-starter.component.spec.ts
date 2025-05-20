import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessStarterComponent } from './process-starter.component';

describe('ProcessStarterComponent', () => {
  let component: ProcessStarterComponent;
  let fixture: ComponentFixture<ProcessStarterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessStarterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessStarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
