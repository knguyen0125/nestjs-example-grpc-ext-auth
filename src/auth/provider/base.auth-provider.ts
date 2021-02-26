import { Injectable } from '@nestjs/common';
import { CheckRequest } from 'src/types/envoy/service/auth/v2/external_auth';

export type AuthenticationDecision = {} & (
  | { $case: 'success'; user: any; info?: any }
  | { $case: 'fail'; challenge?: string; status?: number }
  | { $case: 'redirect'; url: string; status?: number }
  | { $case: 'pass' }
  | { $case: 'error'; error: Error }
);

@Injectable()
export class BaseAuthProvider {
  /**
   * Performs necessary operations to authenticate user
   *
   * @param request Request from Envoy ExtAuth gRPC
   */
  async authenticate(request: CheckRequest): Promise<AuthenticationDecision> {
    throw new Error('Method not implemented.');
  }

  /**
   * Authenticate `user`, with optional `info`
   *
   * @param user an object supplied by the application after it has been given opportunity to verify credentiasl
   * @param info an optional argument containing additional user information
   */
  success(user: any, info?: any): AuthenticationDecision {
    return {
      $case: 'success',
      user,
      info,
    };
  }

  /**
   * Fail authentication, with optional `challenge` and `status`, defaulting to 401
   *
   * @param challenge
   * @param status Status of failed request, defaulting to 401
   */
  fail(challenge?: string, status?: number): AuthenticationDecision {
    return {
      $case: 'fail',
      challenge,
      status: status || 401,
    };
  }

  /**
   * Redirect to `url` with `status`
   *
   * @param url URL to redirect to
   * @param status Status of redirection, default to 302
   */
  redirect(url: string, status?: number): AuthenticationDecision {
    return {
      $case: 'redirect',
      url,
      status: status || 302,
    };
  }

  /**
   * Pass without making a success or fail decision
   */
  pass(): AuthenticationDecision {
    return { $case: 'pass' };
  }

  /**
   * Internal error while performing authentication
   *
   * @param error Error thrown by strategy
   */
  error(error: Error): AuthenticationDecision {
    return { $case: 'error', error };
  }
}
