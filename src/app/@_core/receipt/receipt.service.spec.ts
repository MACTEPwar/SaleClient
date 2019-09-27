import { TestBed } from '@angular/core/testing';

import { ReceiptService } from './receipt.service';
import { HttpClientModule } from '@angular/common/http';

describe('ReceiptService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientModule]
  }));

  it('should be created', () => {
    const service: ReceiptService = TestBed.get(ReceiptService);
    expect(service).toBeTruthy();
  });
});
