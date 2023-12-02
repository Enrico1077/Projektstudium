import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuftragshistorieComponent } from './auftragshistorie.component';

describe('AuftragshistorieComponent', () => {
  let component: AuftragshistorieComponent;
  let fixture: ComponentFixture<AuftragshistorieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuftragshistorieComponent]
    });
    fixture = TestBed.createComponent(AuftragshistorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
