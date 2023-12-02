import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnmeldenComponent } from './anmelden.component';

describe('AnmeldenComponent', () => {
  let component: AnmeldenComponent;
  let fixture: ComponentFixture<AnmeldenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnmeldenComponent]
    });
    fixture = TestBed.createComponent(AnmeldenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
