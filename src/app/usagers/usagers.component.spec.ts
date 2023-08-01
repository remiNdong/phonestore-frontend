import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsagersComponent } from './usagers.component';

describe('UsagersComponent', () => {
  let component: UsagersComponent;
  let fixture: ComponentFixture<UsagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsagersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
