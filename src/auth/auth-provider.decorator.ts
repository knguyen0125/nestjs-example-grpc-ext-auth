import { SetMetadata } from '@nestjs/common';

export const AuthProvider = (name: string, priority: number = 999) =>
  SetMetadata('authProvider', { name, priority });
