import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmSplitterDividerComponent } from './nm-splitter-divider.component';

describe('NmSplitterDividerComponent', () => {
  let component: NmSplitterDividerComponent;
  let fixture: ComponentFixture<NmSplitterDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NmSplitterDividerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NmSplitterDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
