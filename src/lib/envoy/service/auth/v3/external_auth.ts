/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { AttributeContext } from '../../../../envoy/service/auth/v3/attribute_context';
import { HttpStatus } from '../../../../envoy/type/v3/http_status';
import { Struct } from '../../../../google/protobuf/struct';
import { Status } from '../../../../google/rpc/status';
import { Observable } from 'rxjs';
import { HeaderValueOption } from '../../../../envoy/config/core/v3/base';
import { Metadata } from 'grpc';

export const protobufPackage = 'envoy.service.auth.v3';

export interface CheckRequest {
  /** The request attributes. */
  attributes?: AttributeContext;
}

/** HTTP attributes for a denied response. */
export interface DeniedHttpResponse {
  /**
   * This field allows the authorization service to send a HTTP response status
   * code to the downstream client other than 403 (Forbidden).
   */
  status?: HttpStatus;
  /**
   * This field allows the authorization service to send HTTP response headers
   * to the downstream client. Note that the :ref:`append field in HeaderValueOption <envoy_v3_api_field_config.core.v3.HeaderValueOption.append>` defaults to
   * false when used in this message.
   */
  headers: HeaderValueOption[];
  /**
   * This field allows the authorization service to send a response body data
   * to the downstream client.
   */
  body: string;
}

/**
 * HTTP attributes for an OK response.
 * [#next-free-field: 7]
 */
export interface OkHttpResponse {
  /**
   * HTTP entity headers in addition to the original request headers. This allows the authorization
   * service to append, to add or to override headers from the original request before
   * dispatching it to the upstream. Note that the :ref:`append field in HeaderValueOption <envoy_v3_api_field_config.core.v3.HeaderValueOption.append>` defaults to
   * false when used in this message. By setting the `append` field to `true`,
   * the filter will append the correspondent header value to the matched request header.
   * By leaving `append` as false, the filter will either add a new header, or override an existing
   * one if there is a match.
   */
  headers: HeaderValueOption[];
  /**
   * HTTP entity headers to remove from the original request before dispatching
   * it to the upstream. This allows the authorization service to act on auth
   * related headers (like `Authorization`), process them, and consume them.
   * Under this model, the upstream will either receive the request (if it's
   * authorized) or not receive it (if it's not), but will not see headers
   * containing authorization credentials.
   *
   * Pseudo headers (such as `:authority`, `:method`, `:path` etc), as well as
   * the header `Host`, may not be removed as that would make the request
   * malformed. If mentioned in `headers_to_remove` these special headers will
   * be ignored.
   *
   * When using the HTTP service this must instead be set by the HTTP
   * authorization service as a comma separated list like so:
   * ``x-envoy-auth-headers-to-remove: one-auth-header, another-auth-header``.
   */
  headersToRemove: string[];
  /**
   * This field has been deprecated in favor of :ref:`CheckResponse.dynamic_metadata
   * <envoy_v3_api_field_service.auth.v3.CheckResponse.dynamic_metadata>`. Until it is removed,
   * setting this field overrides :ref:`CheckResponse.dynamic_metadata
   * <envoy_v3_api_field_service.auth.v3.CheckResponse.dynamic_metadata>`.
   *
   * @deprecated
   */
  dynamicMetadata?: Struct;
  /**
   * This field allows the authorization service to send HTTP response headers
   * to the downstream client on success. Note that the :ref:`append field in HeaderValueOption <envoy_v3_api_field_config.core.v3.HeaderValueOption.append>`
   * defaults to false when used in this message.
   */
  responseHeadersToAdd: HeaderValueOption[];
}

/** Intended for gRPC and Network Authorization servers `only`. */
export interface CheckResponse {
  /** Status `OK` allows the request. Any other status indicates the request should be denied. */
  status?: Status;
  /** Supplies http attributes for a denied response. */
  deniedResponse?: DeniedHttpResponse | undefined;
  /** Supplies http attributes for an ok response. */
  okResponse?: OkHttpResponse | undefined;
  /**
   * Optional response metadata that will be emitted as dynamic metadata to be consumed by the next
   * filter. This metadata lives in a namespace specified by the canonical name of extension filter
   * that requires it:
   *
   * - :ref:`envoy.filters.http.ext_authz <config_http_filters_ext_authz_dynamic_metadata>` for HTTP filter.
   * - :ref:`envoy.filters.network.ext_authz <config_network_filters_ext_authz_dynamic_metadata>` for network filter.
   */
  dynamicMetadata?: Struct;
}

export const ENVOY_SERVICE_AUTH_V3_PACKAGE_NAME = 'envoy.service.auth.v3';

/**
 * A generic interface for performing authorization check on incoming
 * requests to a networked service.
 */

export interface AuthorizationClient {
  /**
   * Performs authorization check based on the attributes associated with the
   * incoming request, and returns status `OK` or not `OK`.
   */

  check(
    request: CheckRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<CheckResponse>;
}

/**
 * A generic interface for performing authorization check on incoming
 * requests to a networked service.
 */

export interface AuthorizationController {
  /**
   * Performs authorization check based on the attributes associated with the
   * incoming request, and returns status `OK` or not `OK`.
   */

  check(
    request: CheckRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<CheckResponse> | Observable<CheckResponse> | CheckResponse;
}

export function AuthorizationControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods = ['check'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('Authorization', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('Authorization', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const AUTHORIZATION_SERVICE_NAME = 'Authorization';
