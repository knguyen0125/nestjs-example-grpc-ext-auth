import { Controller } from '@nestjs/common';
import { Metadata } from 'grpc';
import { Observable } from 'rxjs';
import {
  AuthorizationController,
  AuthorizationControllerMethods,
  CheckRequest,
  CheckResponse,
} from 'src/lib/envoy/service/auth/v3/external_auth';
import { AuthService } from './auth.service';

@Controller('')
@AuthorizationControllerMethods()
export class AuthController implements AuthorizationController {
  constructor(private authService: AuthService) {}

  check(
    request: CheckRequest,
    metadata: Metadata,
    ...rest: any
  ): CheckResponse | Promise<CheckResponse> | Observable<CheckResponse> {
    throw new Error('Method not implemented.');
  }
}
