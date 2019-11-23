import { TestBed } from '@angular/core/testing';

import { PrivateChatServiceService } from './private-chat-service.service';

describe('PrivateChatServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrivateChatServiceService = TestBed.get(PrivateChatServiceService);
    expect(service).toBeTruthy();
  });
});
