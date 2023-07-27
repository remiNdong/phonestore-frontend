import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationsModeleComponent } from './associations-modele.component';

describe('AssociationsModeleComponent', () => {
  let component: AssociationsModeleComponent;
  let fixture: ComponentFixture<AssociationsModeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationsModeleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationsModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
