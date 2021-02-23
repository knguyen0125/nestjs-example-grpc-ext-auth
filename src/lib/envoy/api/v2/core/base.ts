/* eslint-disable */
import { SemanticVersion } from '../../../../envoy/type/semantic_version';
import { Struct } from '../../../../google/protobuf/struct';
import { BackoffStrategy } from '../../../../envoy/api/v2/core/backoff';
import { HttpUri } from '../../../../envoy/api/v2/core/http_uri';
import { FractionalPercent } from '../../../../envoy/type/percent';
import { Address } from '../../../../envoy/api/v2/core/address';
import { Any } from '../../../../google/protobuf/any';

export const protobufPackage = 'envoy.api.v2.core';

/**
 * Envoy supports :ref:`upstream priority routing
 * <arch_overview_http_routing_priority>` both at the route and the virtual
 * cluster level. The current priority implementation uses different connection
 * pool and circuit breaking settings for each priority level. This means that
 * even for HTTP/2 requests, two physical connections will be used to an
 * upstream host. In the future Envoy will likely support true HTTP/2 priority
 * over a single upstream connection.
 */
export enum RoutingPriority {
  DEFAULT = 0,
  HIGH = 1,
  UNRECOGNIZED = -1,
}

/** HTTP request method. */
export enum RequestMethod {
  METHOD_UNSPECIFIED = 0,
  GET = 1,
  HEAD = 2,
  POST = 3,
  PUT = 4,
  DELETE = 5,
  CONNECT = 6,
  OPTIONS = 7,
  TRACE = 8,
  PATCH = 9,
  UNRECOGNIZED = -1,
}

/** Identifies the direction of the traffic relative to the local Envoy. */
export enum TrafficDirection {
  /** UNSPECIFIED - Default option is unspecified. */
  UNSPECIFIED = 0,
  /** INBOUND - The transport is used for incoming traffic. */
  INBOUND = 1,
  /** OUTBOUND - The transport is used for outgoing traffic. */
  OUTBOUND = 2,
  UNRECOGNIZED = -1,
}

/** Identifies location of where either Envoy runs or where upstream hosts run. */
export interface Locality {
  /** Region this :ref:`zone <envoy_api_field_core.Locality.zone>` belongs to. */
  region: string;
  /**
   * Defines the local service zone where Envoy is running. Though optional, it
   * should be set if discovery service routing is used and the discovery
   * service exposes :ref:`zone data <envoy_api_field_endpoint.LocalityLbEndpoints.locality>`,
   * either in this message or via :option:`--service-zone`. The meaning of zone
   * is context dependent, e.g. `Availability Zone (AZ)
   * <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html>`_
   * on AWS, `Zone <https://cloud.google.com/compute/docs/regions-zones/>`_ on
   * GCP, etc.
   */
  zone: string;
  /**
   * When used for locality of upstream hosts, this field further splits zone
   * into smaller chunks of sub-zones so they can be load balanced
   * independently.
   */
  subZone: string;
}

/**
 * BuildVersion combines SemVer version of extension with free-form build information
 * (i.e. 'alpha', 'private-build') as a set of strings.
 */
export interface BuildVersion {
  /** SemVer version of extension. */
  version?: SemanticVersion;
  /**
   * Free-form build information.
   * Envoy defines several well known keys in the source/common/version/version.h file
   */
  metadata?: Struct;
}

/**
 * Version and identification for an Envoy extension.
 * [#next-free-field: 6]
 */
export interface Extension {
  /**
   * This is the name of the Envoy filter as specified in the Envoy
   * configuration, e.g. envoy.filters.http.router, com.acme.widget.
   */
  name: string;
  /**
   * Category of the extension.
   * Extension category names use reverse DNS notation. For instance "envoy.filters.listener"
   * for Envoy's built-in listener filters or "com.acme.filters.http" for HTTP filters from
   * acme.com vendor.
   * [#comment:TODO(yanavlasov): Link to the doc with existing envoy category names.]
   */
  category: string;
  /**
   * [#not-implemented-hide:] Type descriptor of extension configuration proto.
   * [#comment:TODO(yanavlasov): Link to the doc with existing configuration protos.]
   * [#comment:TODO(yanavlasov): Add tests when PR #9391 lands.]
   */
  typeDescriptor: string;
  /**
   * The version is a property of the extension and maintained independently
   * of other extensions and the Envoy API.
   * This field is not set when extension did not provide version information.
   */
  version?: BuildVersion;
  /** Indicates that the extension is present but was disabled via dynamic configuration. */
  disabled: boolean;
}

/**
 * Identifies a specific Envoy instance. The node identifier is presented to the
 * management server, which may use this identifier to distinguish per Envoy
 * configuration for serving.
 * [#next-free-field: 12]
 */
export interface Node {
  /**
   * An opaque node identifier for the Envoy node. This also provides the local
   * service node name. It should be set if any of the following features are
   * used: :ref:`statsd <arch_overview_statistics>`, :ref:`CDS
   * <config_cluster_manager_cds>`, and :ref:`HTTP tracing
   * <arch_overview_tracing>`, either in this message or via
   * :option:`--service-node`.
   */
  id: string;
  /**
   * Defines the local service cluster name where Envoy is running. Though
   * optional, it should be set if any of the following features are used:
   * :ref:`statsd <arch_overview_statistics>`, :ref:`health check cluster
   * verification
   * <envoy_api_field_core.HealthCheck.HttpHealthCheck.service_name_matcher>`,
   * :ref:`runtime override directory <envoy_api_msg_config.bootstrap.v2.Runtime>`,
   * :ref:`user agent addition
   * <envoy_api_field_config.filter.network.http_connection_manager.v2.HttpConnectionManager.add_user_agent>`,
   * :ref:`HTTP global rate limiting <config_http_filters_rate_limit>`,
   * :ref:`CDS <config_cluster_manager_cds>`, and :ref:`HTTP tracing
   * <arch_overview_tracing>`, either in this message or via
   * :option:`--service-cluster`.
   */
  cluster: string;
  /**
   * Opaque metadata extending the node identifier. Envoy will pass this
   * directly to the management server.
   */
  metadata?: Struct;
  /** Locality specifying where the Envoy instance is running. */
  locality?: Locality;
  /**
   * This is motivated by informing a management server during canary which
   * version of Envoy is being tested in a heterogeneous fleet. This will be set
   * by Envoy in management server RPCs.
   * This field is deprecated in favor of the user_agent_name and user_agent_version values.
   *
   * @deprecated
   */
  buildVersion: string;
  /**
   * Free-form string that identifies the entity requesting config.
   * E.g. "envoy" or "grpc"
   */
  userAgentName: string;
  /**
   * Free-form string that identifies the version of the entity requesting config.
   * E.g. "1.12.2" or "abcd1234", or "SpecialEnvoyBuild"
   */
  userAgentVersion: string | undefined;
  /** Structured version of the entity requesting config. */
  userAgentBuildVersion?: BuildVersion | undefined;
  /** List of extensions and their versions supported by the node. */
  extensions: Extension[];
  /**
   * Client feature support list. These are well known features described
   * in the Envoy API repository for a given major version of an API. Client features
   * use reverse DNS naming scheme, for example `com.acme.feature`.
   * See :ref:`the list of features <client_features>` that xDS client may
   * support.
   */
  clientFeatures: string[];
  /**
   * Known listening ports on the node as a generic hint to the management server
   * for filtering :ref:`listeners <config_listeners>` to be returned. For example,
   * if there is a listener bound to port 80, the list can optionally contain the
   * SocketAddress `(0.0.0.0,80)`. The field is optional and just a hint.
   */
  listeningAddresses: Address[];
}

/**
 * Metadata provides additional inputs to filters based on matched listeners,
 * filter chains, routes and endpoints. It is structured as a map, usually from
 * filter name (in reverse DNS format) to metadata specific to the filter. Metadata
 * key-values for a filter are merged as connection and request handling occurs,
 * with later values for the same key overriding earlier values.
 *
 * An example use of metadata is providing additional values to
 * http_connection_manager in the envoy.http_connection_manager.access_log
 * namespace.
 *
 * Another example use of metadata is to per service config info in cluster metadata, which may get
 * consumed by multiple filters.
 *
 * For load balancing, Metadata provides a means to subset cluster endpoints.
 * Endpoints have a Metadata object associated and routes contain a Metadata
 * object to match against. There are some well defined metadata used today for
 * this purpose:
 *
 * * ``{"envoy.lb": {"canary": <bool> }}`` This indicates the canary status of an
 *   endpoint and is also used during header processing
 *   (x-envoy-upstream-canary) and for stats purposes.
 * [#next-major-version: move to type/metadata/v2]
 */
export interface Metadata {
  /**
   * Key is the reverse DNS filter name, e.g. com.acme.widget. The envoy.*
   * namespace is reserved for Envoy's built-in filters.
   */
  filterMetadata: { [key: string]: Struct };
}

export interface Metadata_FilterMetadataEntry {
  key: string;
  value?: Struct;
}

/** Runtime derived uint32 with a default when not specified. */
export interface RuntimeUInt32 {
  /** Default value if runtime value is not available. */
  defaultValue: number;
  /** Runtime key to get value for comparison. This value is used if defined. */
  runtimeKey: string;
}

/** Runtime derived double with a default when not specified. */
export interface RuntimeDouble {
  /** Default value if runtime value is not available. */
  defaultValue: number;
  /** Runtime key to get value for comparison. This value is used if defined. */
  runtimeKey: string;
}

/** Runtime derived bool with a default when not specified. */
export interface RuntimeFeatureFlag {
  /** Default value if runtime value is not available. */
  defaultValue?: boolean;
  /**
   * Runtime key to get value for comparison. This value is used if defined. The boolean value must
   * be represented via its
   * `canonical JSON encoding <https://developers.google.com/protocol-buffers/docs/proto3#json>`_.
   */
  runtimeKey: string;
}

/** Header name/value pair. */
export interface HeaderValue {
  /** Header name. */
  key: string;
  /**
   * Header value.
   *
   * The same :ref:`format specifier <config_access_log_format>` as used for
   * :ref:`HTTP access logging <config_access_log>` applies here, however
   * unknown header values are replaced with the empty string instead of `-`.
   */
  value: string;
}

/** Header name/value pair plus option to control append behavior. */
export interface HeaderValueOption {
  /** Header name/value pair that this option applies to. */
  header?: HeaderValue;
  /**
   * Should the value be appended? If true (default), the value is appended to
   * existing values.
   */
  append?: boolean;
}

/** Wrapper for a set of headers. */
export interface HeaderMap {
  headers: HeaderValue[];
}

/** Data source consisting of either a file or an inline value. */
export interface DataSource {
  /** Local filesystem data source. */
  filename: string | undefined;
  /** Bytes inlined in the configuration. */
  inlineBytes: Uint8Array | undefined;
  /** String inlined in the configuration. */
  inlineString: string | undefined;
}

/** The message specifies the retry policy of remote data source when fetching fails. */
export interface RetryPolicy {
  /**
   * Specifies parameters that control :ref:`retry backoff strategy <envoy_api_msg_core.BackoffStrategy>`.
   * This parameter is optional, in which case the default base interval is 1000 milliseconds. The
   * default maximum interval is 10 times the base interval.
   */
  retryBackOff?: BackoffStrategy;
  /**
   * Specifies the allowed number of retries. This parameter is optional and
   * defaults to 1.
   */
  numRetries?: number;
}

/** The message specifies how to fetch data from remote and how to verify it. */
export interface RemoteDataSource {
  /** The HTTP URI to fetch the remote data. */
  httpUri?: HttpUri;
  /** SHA256 string for verifying data. */
  sha256: string;
  /** Retry policy for fetching remote data. */
  retryPolicy?: RetryPolicy;
}

/** Async data source which support async data fetch. */
export interface AsyncDataSource {
  /** Local async data source. */
  local?: DataSource | undefined;
  /** Remote async data source. */
  remote?: RemoteDataSource | undefined;
}

/**
 * Configuration for transport socket in :ref:`listeners <config_listeners>` and
 * :ref:`clusters <envoy_api_msg_Cluster>`. If the configuration is
 * empty, a default transport socket implementation and configuration will be
 * chosen based on the platform and existence of tls_context.
 */
export interface TransportSocket {
  /**
   * The name of the transport socket to instantiate. The name must match a supported transport
   * socket implementation.
   */
  name: string;
  /** @deprecated */
  config?: Struct | undefined;
  typedConfig?: Any | undefined;
}

/**
 * Runtime derived FractionalPercent with defaults for when the numerator or denominator is not
 * specified via a runtime key.
 *
 * .. note::
 *
 *   Parsing of the runtime key's data is implemented such that it may be represented as a
 *   :ref:`FractionalPercent <envoy_api_msg_type.FractionalPercent>` proto represented as JSON/YAML
 *   and may also be represented as an integer with the assumption that the value is an integral
 *   percentage out of 100. For instance, a runtime key lookup returning the value "42" would parse
 *   as a `FractionalPercent` whose numerator is 42 and denominator is HUNDRED.
 */
export interface RuntimeFractionalPercent {
  /** Default value if the runtime value's for the numerator/denominator keys are not available. */
  defaultValue?: FractionalPercent;
  /** Runtime key for a YAML representation of a FractionalPercent. */
  runtimeKey: string;
}

/** Identifies a specific ControlPlane instance that Envoy is connected to. */
export interface ControlPlane {
  /**
   * An opaque control plane identifier that uniquely identifies an instance
   * of control plane. This can be used to identify which control plane instance,
   * the Envoy is connected to.
   */
  identifier: string;
}

export const ENVOY_API_V2_CORE_PACKAGE_NAME = 'envoy.api.v2.core';
