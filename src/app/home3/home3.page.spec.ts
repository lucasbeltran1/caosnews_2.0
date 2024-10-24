import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home3Page } from './home3.page';

describe('Home3Page', () => {
  let component: Home3Page;
  let fixture: ComponentFixture<Home3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Home3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
