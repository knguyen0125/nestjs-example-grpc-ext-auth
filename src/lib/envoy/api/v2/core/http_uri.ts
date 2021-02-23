/* eslint-disable */
import { Duration } from '../../../../google/protobuf/duration';

export const protobufPackage = 'envoy.api.v2.core';

/** Envoy external URI descriptor */
export interface HttpUri {
  /**
   * The HTTP server URI. It should be a full FQDN with protocol, host and path.
   *
   * Example:
   *
   * .. code-block:: yaml
   *
   *    uri: https://www.googleapis.com/oauth2/v1/certs
   */
  uri: string;
  /**
   * A cluster is created in the Envoy "cluster_manager" config
   * section. This field specifies the cluster name.
   *
   * Example:
   *
   * .. code-block:: yaml
   *
   *    cluster: jwks_cluster
   */
  cluster: string | undefined;
  /** Sets the maximum duration in milliseconds that a response can take to arrive upon request. */
  timeout?: Duration;
}

export const ENVOY_API_V2_CORE_PACKAGE_NAME = 'envoy.api.v2.core';
