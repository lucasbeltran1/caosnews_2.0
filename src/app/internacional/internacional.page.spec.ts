import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternacionalPage } from './internacional.page';

describe('InternacionalPage', () => {
  let component: InternacionalPage;
  let fixture: ComponentFixture<InternacionalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InternacionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
