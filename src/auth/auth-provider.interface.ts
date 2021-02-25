import { CheckRequest } from 'src/types/envoy/service/auth/v2/external_auth';

export interface AuthProvider {
  shouldValidate(request: CheckRequest): boolean | Promise<boolean>;
  validate(request: CheckRequest): boolean | Promise<boolean>;
}
