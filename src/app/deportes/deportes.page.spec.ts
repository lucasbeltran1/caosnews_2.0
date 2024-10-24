import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeportesPage } from './deportes.page';

describe('DeportesPage', () => {
  let component: DeportesPage;
  let fixture: ComponentFixture<DeportesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeportesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
