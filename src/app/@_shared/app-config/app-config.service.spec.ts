import { TestBed } from '@angular/core/testing';

import { AppConfigService } from './app-config.service';
import { HttpClientModule } from '@angular/common/http';

describe('AppConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientModule]
  }));

  it('should be created', () => {
    const service: AppConfigService = TestBed.get(AppConfigService);
    expect(service).toBeTruthy();
  });
});
