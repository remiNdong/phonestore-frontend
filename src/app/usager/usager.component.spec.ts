import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsagerComponent } from './usager.component';

describe('UsagerComponent', () => {
  let component: UsagerComponent;
  let fixture: ComponentFixture<UsagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
