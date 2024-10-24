import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CinePage } from './cine.page';

describe('CinePage', () => {
  let component: CinePage;
  let fixture: ComponentFixture<CinePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
