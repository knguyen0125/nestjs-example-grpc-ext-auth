import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { CheckRequest } from 'src/types/envoy/service/auth/v2/external_auth';
import { AuthProvider } from '../auth-provider.decorator';
import { AuthenticationDecision, BaseAuthProvider } from './base.auth-provider';

@Injectable()
@AuthProvider('passthrough', 0)
export class PassthroughAuthProvider extends BaseAuthProvider {
  async authenticate(request: CheckRequest): Promise<AuthenticationDecision> {
    const passthroughExtension = _.get(
      request,
      'attributes.contextExtensions.passthrough',
    );

    // Delegate authentication handling to upstream service
    if (_.lowerCase(passthroughExtension) === 'true') {
      return this.pass();
    }

    // Returns fail so that it's not considered any further
    return this.fail();
  }
}
