/* eslint-disable */
import { Duration } from '../../../../google/protobuf/duration';

export const protobufPackage = 'envoy.config.core.v3';

/** Configuration defining a jittered exponential back off strategy. */
export interface BackoffStrategy {
  /**
   * The base interval to be used for the next back off computation. It should
   * be greater than zero and less than or equal to :ref:`max_interval
   * <envoy_api_field_config.core.v3.BackoffStrategy.max_interval>`.
   */
  baseInterval?: Duration;
  /**
   * Specifies the maximum interval between retries. This parameter is optional,
   * but must be greater than or equal to the :ref:`base_interval
   * <envoy_api_field_config.core.v3.BackoffStrategy.base_interval>` if set. The default
   * is 10 times the :ref:`base_interval
   * <envoy_api_field_config.core.v3.BackoffStrategy.base_interval>`.
   */
  maxInterval?: Duration;
}

export const ENVOY_CONFIG_CORE_V3_PACKAGE_NAME = 'envoy.config.core.v3';
