import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuftragswarteschlangeComponent } from './auftragswarteschlange.component';

describe('AuftragswarteschlangeComponent', () => {
  let component: AuftragswarteschlangeComponent;
  let fixture: ComponentFixture<AuftragswarteschlangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuftragswarteschlangeComponent]
    });
    fixture = TestBed.createComponent(AuftragswarteschlangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
