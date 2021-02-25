import { CheckRequest } from 'src/types/envoy/service/auth/v2/external_auth';

export interface AuthProvider {
  validate: (request: CheckRequest) => boolean | Promise<boolean>;
}
