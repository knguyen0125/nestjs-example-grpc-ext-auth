/* eslint-disable */
import { Metadata } from '../../../../envoy/api/v2/core/base';
import { Address } from '../../../../envoy/api/v2/core/address';
import { Timestamp } from '../../../../google/protobuf/timestamp';

export const protobufPackage = 'envoy.service.auth.v2';

/**
 * An attribute is a piece of metadata that describes an activity on a network.
 * For example, the size of an HTTP request, or the status code of an HTTP response.
 *
 * Each attribute has a type and a name, which is logically defined as a proto message field
 * of the `AttributeContext`. The `AttributeContext` is a collection of individual attributes
 * supported by Envoy authorization system.
 * [#comment: The following items are left out of this proto
 * Request.Auth field for jwt tokens
 * Request.Api for api management
 * Origin peer that originated the request
 * Caching Protocol
 * request_context return values to inject back into the filter chain
 * peer.claims -- from X.509 extensions
 * Configuration
 * - field mask to send
 * - which return values from request_context are copied back
 * - which return values are copied into request_headers]
 * [#next-free-field: 12]
 */
export interface AttributeContext {
  /**
   * The source of a network activity, such as starting a TCP connection.
   * In a multi hop network activity, the source represents the sender of the
   * last hop.
   */
  source?: AttributeContext_Peer;
  /**
   * The destination of a network activity, such as accepting a TCP connection.
   * In a multi hop network activity, the destination represents the receiver of
   * the last hop.
   */
  destination?: AttributeContext_Peer;
  /** Represents a network request, such as an HTTP request. */
  request?: AttributeContext_Request;
  /**
   * This is analogous to http_request.headers, however these contents will not be sent to the
   * upstream server. Context_extensions provide an extension mechanism for sending additional
   * information to the auth server without modifying the proto definition. It maps to the
   * internal opaque context in the filter chain.
   */
  contextExtensions: { [key: string]: string };
  /** Dynamic metadata associated with the request. */
  metadataContext?: Metadata;
}

/**
 * This message defines attributes for a node that handles a network request.
 * The node can be either a service or an application that sends, forwards,
 * or receives the request. Service peers should fill in the `service`,
 * `principal`, and `labels` as appropriate.
 * [#next-free-field: 6]
 */
export interface AttributeContext_Peer {
  /**
   * The address of the peer, this is typically the IP address.
   * It can also be UDS path, or others.
   */
  address?: Address;
  /**
   * The canonical service name of the peer.
   * It should be set to :ref:`the HTTP x-envoy-downstream-service-cluster
   * <config_http_conn_man_headers_downstream-service-cluster>`
   * If a more trusted source of the service name is available through mTLS/secure naming, it
   * should be used.
   */
  service: string;
  /**
   * The labels associated with the peer.
   * These could be pod labels for Kubernetes or tags for VMs.
   * The source of the labels could be an X.509 certificate or other configuration.
   */
  labels: { [key: string]: string };
  /**
   * The authenticated identity of this peer.
   * For example, the identity associated with the workload such as a service account.
   * If an X.509 certificate is used to assert the identity this field should be sourced from
   * `URI Subject Alternative Names`, `DNS Subject Alternate Names` or `Subject` in that order.
   * The primary identity should be the principal. The principal format is issuer specific.
   *
   * Example:
   * *    SPIFFE format is `spiffe://trust-domain/path`
   * *    Google account format is `https://accounts.google.com/{userid}`
   */
  principal: string;
  /**
   * The X.509 certificate used to authenticate the identify of this peer.
   * When present, the certificate contents are encoded in URL and PEM format.
   */
  certificate: string;
}

export interface AttributeContext_Peer_LabelsEntry {
  key: string;
  value: string;
}

/** Represents a network request, such as an HTTP request. */
export interface AttributeContext_Request {
  /** The timestamp when the proxy receives the first byte of the request. */
  time?: Timestamp;
  /** Represents an HTTP request or an HTTP-like request. */
  http?: AttributeContext_HttpRequest;
}

/**
 * This message defines attributes for an HTTP request.
 * HTTP/1.x, HTTP/2, gRPC are all considered as HTTP requests.
 * [#next-free-field: 12]
 */
export interface AttributeContext_HttpRequest {
  /**
   * The unique ID for a request, which can be propagated to downstream
   * systems. The ID should have low probability of collision
   * within a single day for a specific service.
   * For HTTP requests, it should be X-Request-ID or equivalent.
   */
  id: string;
  /** The HTTP request method, such as `GET`, `POST`. */
  method: string;
  /**
   * The HTTP request headers. If multiple headers share the same key, they
   * must be merged according to the HTTP spec. All header keys must be
   * lower-cased, because HTTP header keys are case-insensitive.
   */
  headers: { [key: string]: string };
  /**
   * The request target, as it appears in the first line of the HTTP request. This includes
   * the URL path and query-string. No decoding is performed.
   */
  path: string;
  /** The HTTP request `Host` or 'Authority` header value. */
  host: string;
  /**
   * The HTTP URL scheme, such as `http` and `https`. This is set for HTTP/2
   * requests only. For HTTP/1.1, use "x-forwarded-for" header value to lookup
   * the scheme of the request.
   */
  scheme: string;
  /**
   * This field is always empty, and exists for compatibility reasons. The HTTP URL query is
   * included in `path` field.
   */
  query: string;
  /**
   * This field is always empty, and exists for compatibility reasons. The URL fragment is
   * not submitted as part of HTTP requests; it is unknowable.
   */
  fragment: string;
  /** The HTTP request size in bytes. If unknown, it must be -1. */
  size: number;
  /**
   * The network protocol used with the request, such as "HTTP/1.0", "HTTP/1.1", or "HTTP/2".
   *
   * See :repo:`headers.h:ProtocolStrings <source/common/http/headers.h>` for a list of all
   * possible values.
   */
  protocol: string;
  /** The HTTP request body. */
  body: string;
}

export interface AttributeContext_HttpRequest_HeadersEntry {
  key: string;
  value: string;
}

export interface AttributeContext_ContextExtensionsEntry {
  key: string;
  value: string;
}

export const ENVOY_SERVICE_AUTH_V2_PACKAGE_NAME = 'envoy.service.auth.v2';
