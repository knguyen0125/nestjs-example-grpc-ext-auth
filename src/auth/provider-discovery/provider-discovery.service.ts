import { DiscoveryService } from '@golevelup/nestjs-discovery';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { AuthProvider } from '../auth-provider.interface';

@Injectable()
export class ProviderDiscoveryService implements OnModuleInit {
  private _providers: AuthProvider[] = [];

  constructor(
    private discoverySerice: DiscoveryService,
    private moduleRef: ModuleRef,
  ) {}

  async onModuleInit() {
    const discoveredProviders = await this.discoverySerice.providersWithMetaAtKey(
      'authProvider',
    );

    const interimProviders: { instance: AuthProvider; priority: number }[] = [];

    await Promise.all(
      discoveredProviders.map(async (provider) => {
        const instance = await this.moduleRef.resolve<AuthProvider>(
          provider.discoveredClass.name,
        );
        const priority = (provider.meta as any).priority;

        interimProviders.push({ priority, instance });
      }),
    );

    this._providers = [...interimProviders]
      .sort((a, b) => a.priority - b.priority)
      .map((p) => p.instance);
  }

  get providers() {
    return this._providers;
  }
}
