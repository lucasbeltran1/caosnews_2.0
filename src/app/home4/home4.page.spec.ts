import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home4Page } from './home4.page';

describe('Home4Page', () => {
  let component: Home4Page;
  let fixture: ComponentFixture<Home4Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Home4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
