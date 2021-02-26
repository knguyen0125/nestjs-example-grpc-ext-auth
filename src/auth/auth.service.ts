import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { status } from 'grpc';
import { StatusCode } from 'src/types/envoy/type/http_status';
import {
  CheckRequest,
  CheckResponse,
} from 'src/types/envoy/service/auth/v2/external_auth';
import { ProviderDiscoveryService } from './provider-discovery/provider-discovery.service';

@Injectable()
export class AuthService {
  constructor(private providerDiscoveryService: ProviderDiscoveryService) {}

  async check(request: CheckRequest): Promise<CheckResponse> {
    const results = await Promise.all(
      this.providerDiscoveryService.providers.map((provider) =>
        provider.authenticate(request),
      ),
    );

    console.log(results);
    console.log(JSON.stringify(request, null, 2));
    try {
      const token = 'Bearer abcd';
      console.log('hello world');
      // return this.createUnauthenticatedResponse();
      return this.createOkResponse(token);
    } catch (err) {
      return this.createInternalServerErrorResponse();
    }
  }

  private createOkResponse(token: string): CheckResponse {
    return {
      status: {
        code: 0,
        details: [],
        message: '',
      },
      okResponse: {
        headers: [
          {
            // Hack because append is a wrapper value,
            // and ts-proto definition doesn't play well with NestJS protobuf.js
            // https://github.com/stephenh/ts-proto/issues/69
            // @ts-ignore
            append: {
              value: false,
            },
            header: {
              key: 'authorization',
              value: token,
            },
          },
        ],
      },
    };
  }

  private createUnauthenticatedResponse(): CheckResponse {
    return {
      status: {
        code: status.UNAUTHENTICATED,
        details: [],
        message: 'Unauthenticated',
      },
      deniedResponse: {
        status: { code: StatusCode.Unauthorized },
        headers: [],
        body: JSON.stringify(new UnauthorizedException().getResponse()),
      },
    };
  }

  private createInternalServerErrorResponse(): CheckResponse {
    return {
      status: {
        code: status.INTERNAL,
        details: [],
        message: 'Internal Server Error',
      },
      deniedResponse: {
        status: { code: StatusCode.InternalServerError },
        headers: [],
        body: JSON.stringify(new InternalServerErrorException().getResponse()),
      },
    };
  }
}
