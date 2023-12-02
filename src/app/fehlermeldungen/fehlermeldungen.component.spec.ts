import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FehlermeldungenComponent } from './fehlermeldungen.component';

describe('FehlermeldungenComponent', () => {
  let component: FehlermeldungenComponent;
  let fixture: ComponentFixture<FehlermeldungenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FehlermeldungenComponent]
    });
    fixture = TestBed.createComponent(FehlermeldungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
