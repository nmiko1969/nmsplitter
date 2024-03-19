import { TestBed } from '@angular/core/testing';

import { NmSplitterService } from './nm-splitter.service';

describe('NmSplitterService', () => {
  let service: NmSplitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NmSplitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
