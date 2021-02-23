import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall, status, StatusBuilder } from 'grpc';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import {
  AuthorizationController,
  AuthorizationControllerMethods,
  CheckRequest,
  CheckResponse,
} from './lib/envoy/service/auth/v2/external_auth';

@Controller()
export class AppController {}
