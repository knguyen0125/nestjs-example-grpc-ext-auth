import { Injectable, SetMetadata } from '@nestjs/common';
import { CheckRequest } from 'src/types/envoy/service/auth/v2/external_auth';
import { AuthProvider } from '../auth-provider.decorator';
import { AuthenticationDecision, BaseAuthProvider } from './base.auth-provider';
import * as _ from 'lodash';

@Injectable()
@AuthProvider('basic', 2)
export class BasicAuthProvider extends BaseAuthProvider {
  async verify(username: string, password: string): Promise<any> {
    if (Math.random() > 0.5) {
      return { clientId: username };
    }

    throw new Error();
  }

  async authenticate(request: CheckRequest): Promise<AuthenticationDecision> {
    const authorizationHeader = _.get(
      request,
      'attributes.request.http.headers.authorization',
    );

    if (!authorizationHeader) {
      return this.fail();
    }

    console.log(authorizationHeader);
    if (
      !(
        authorizationHeader.startsWith('Basic') ||
        authorizationHeader.startsWith('basic')
      )
    ) {
      return this.fail();
    }

    const rawToken = authorizationHeader.split(' ')[1];
    console.log(rawToken);

    if (!rawToken) {
      return this.fail();
    }

    const [username, password] = this.extractAuthorization(rawToken);

    if (!(username && password)) {
      return this.fail();
    }

    try {
      const userInfo = await this.verify(username, password);

      return this.success(userInfo);
    } catch (err) {
      return this.fail();
    }
  }

  private extractAuthorization(rawToken: string): [string, string] {
    let username: string;
    let password: string;

    let decodedToken: string = rawToken;
    if (this.isBase64(rawToken)) {
      // Decode base 64
      decodedToken = Buffer.from(rawToken, 'base64').toString();
    }

    if (decodedToken.includes(':')) {
      username = decodedToken.split(':')[0];
      password = decodedToken.split(':')[1];
    }

    return [username, password];
  }

  private isBase64(value: string, options?: any) {
    if (!(options instanceof Object)) {
      options = {};
    }

    if (options.allowEmpty === false && value === '') {
      return false;
    }

    var regex =
      '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+/]{3}=)?';
    var mimeRegex = '(data:\\w+\\/[a-zA-Z\\+\\-\\.]+;base64,)';

    if (options.mimeRequired === true) {
      regex = mimeRegex + regex;
    } else if (options.allowMime === true) {
      regex = mimeRegex + '?' + regex;
    }

    if (options.paddingRequired === false) {
      regex =
        '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}(==)?|[A-Za-z0-9+\\/]{3}=?)?';
    }

    return new RegExp('^' + regex + '$', 'gi').test(value);
  }
}
