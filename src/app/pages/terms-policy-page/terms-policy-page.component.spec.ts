import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TermsPolicyPageComponent } from './terms-policy-page.component';

describe('TermsPolicyPageComponent', () => {
  let component: TermsPolicyPageComponent;
  let fixture: ComponentFixture<TermsPolicyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsPolicyPageComponent]
    });
    fixture = TestBed.createComponent(TermsPolicyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
