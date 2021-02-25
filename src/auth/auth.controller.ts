import { Controller } from '@nestjs/common';
import {
  CheckRequest,
  CheckResponse,
  AuthorizationControllerMethods,
  AuthorizationController,
} from 'src/types/envoy/service/auth/v2/external_auth';

import { AuthService } from './auth.service';

@Controller('')
@AuthorizationControllerMethods()
export class AuthController implements AuthorizationController {
  constructor(private authService: AuthService) {}

  check(request: CheckRequest): Promise<CheckResponse> {
    return this.authService.check(request);
  }
}
