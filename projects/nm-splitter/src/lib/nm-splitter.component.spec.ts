import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmSplitterComponent } from './nm-splitter.component';

describe('NmSplitterComponent', () => {
  let component: NmSplitterComponent;
  let fixture: ComponentFixture<NmSplitterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NmSplitterComponent]
    });
    fixture = TestBed.createComponent(NmSplitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
