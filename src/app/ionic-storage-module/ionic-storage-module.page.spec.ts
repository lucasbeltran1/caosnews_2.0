import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicStorageModulePage } from './ionic-storage-module.page';

describe('IonicStorageModulePage', () => {
  let component: IonicStorageModulePage;
  let fixture: ComponentFixture<IonicStorageModulePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IonicStorageModulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
