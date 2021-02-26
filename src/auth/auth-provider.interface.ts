import { CheckRequest } from 'src/types/envoy/service/auth/v2/external_auth';

export interface AuthenticationDecision {}

export interface AuthProvider {
  authenticate(
    request: CheckRequest,
  ): AuthenticationDecision | Promise<AuthenticationDecision>;
}
