import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SegundoHomePage } from './segundo-home.page';

describe('SegundoHomePage', () => {
  let component: SegundoHomePage;
  let fixture: ComponentFixture<SegundoHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SegundoHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
