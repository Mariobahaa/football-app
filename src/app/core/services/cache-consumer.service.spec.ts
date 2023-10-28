import { TestBed } from '@angular/core/testing';

import { CacheConsumerService } from './cache-consumer.service';

describe('CacheConsumerService', () => {
  let service: CacheConsumerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheConsumerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
