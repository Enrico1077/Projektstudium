import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnlageneffektivitaetComponent } from './anlageneffektivitaet.component';

describe('AnlageneffektivitaetComponent', () => {
  let component: AnlageneffektivitaetComponent;
  let fixture: ComponentFixture<AnlageneffektivitaetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnlageneffektivitaetComponent]
    });
    fixture = TestBed.createComponent(AnlageneffektivitaetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
