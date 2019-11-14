import { TestBed } from '@angular/core/testing';

import { ChatserverService } from './chatserver.service';

describe('ChatserverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatserverService = TestBed.get(ChatserverService);
    expect(service).toBeTruthy();
  });
});
