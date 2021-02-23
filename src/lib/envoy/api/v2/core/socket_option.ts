/* eslint-disable */
export const protobufPackage = 'envoy.api.v2.core';

/**
 * Generic socket option message. This would be used to set socket options that
 * might not exist in upstream kernels or precompiled Envoy binaries.
 * [#next-free-field: 7]
 */
export interface SocketOption {
  /**
   * An optional name to give this socket option for debugging, etc.
   * Uniqueness is not required and no special meaning is assumed.
   */
  description: string;
  /** Corresponding to the level value passed to setsockopt, such as IPPROTO_TCP */
  level: number;
  /** The numeric name as passed to setsockopt */
  name: number;
  /** Because many sockopts take an int value. */
  intValue: number | undefined;
  /** Otherwise it's a byte buffer. */
  bufValue: Uint8Array | undefined;
  /**
   * The state in which the option will be applied. When used in BindConfig
   * STATE_PREBIND is currently the only valid value.
   */
  state: SocketOption_SocketState;
}

export enum SocketOption_SocketState {
  /** STATE_PREBIND - Socket options are applied after socket creation but before binding the socket to a port */
  STATE_PREBIND = 0,
  /** STATE_BOUND - Socket options are applied after binding the socket to a port but before calling listen() */
  STATE_BOUND = 1,
  /** STATE_LISTENING - Socket options are applied after calling listen() */
  STATE_LISTENING = 2,
  UNRECOGNIZED = -1,
}

export const ENVOY_API_V2_CORE_PACKAGE_NAME = 'envoy.api.v2.core';
