import { Test, TestingModule } from '@nestjs/testing';
import { ProviderDiscoveryService } from './provider-discovery.service';

describe('ProviderDiscoveryService', () => {
  let service: ProviderDiscoveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProviderDiscoveryService],
    }).compile();

    service = module.get<ProviderDiscoveryService>(ProviderDiscoveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
