import { TestBed } from '@angular/core/testing';

import { DialogServiceService } from './dialog-service.service';

describe('DialogServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogServiceService = TestBed.get(DialogServiceService);
    expect(service).toBeTruthy();
  });
});
