import { Injectable } from '@nestjs/common';
import { CheckRequest } from 'src/types/envoy/service/auth/v2/external_auth';
import { AuthProvider } from '../auth-provider.interface';

@Injectable()
export class Basic implements AuthProvider {
  async shouldValidate(request: CheckRequest): Promise<boolean> {
    const authorizationHeader =
      request.attributes.request.http.headers['authorization'];

    if (!authorizationHeader) {
      return false;
    }

    if (
      !authorizationHeader.startsWith('Basic') ||
      !authorizationHeader.startsWith('basic')
    ) {
      return false;
    }

    const rawToken = authorizationHeader.split(' ')[1];
    if (!rawToken) {
      return false;
    }

    const [username, password] = this.extractAuthorization(rawToken);
  }

  async validate(request: CheckRequest): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  private extractAuthorization(basicToken: string): [string, string] {
    let username: string;
    let password: string;

    let rawToken: string = basicToken;
    if (this.isBase64(basicToken)) {
      // Decode base 64
      rawToken = Buffer.from(basicToken, 'base64').toString();
    }

    if (basicToken.includes(':')) {
      username = basicToken.split(':')[0];
      password = basicToken.split(':')[1];
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
