import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimationPage } from './animation.page';

describe('AnimationPage', () => {
  let component: AnimationPage;
  let fixture: ComponentFixture<AnimationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
