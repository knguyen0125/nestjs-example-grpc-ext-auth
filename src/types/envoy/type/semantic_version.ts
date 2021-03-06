/* eslint-disable */
export const protobufPackage = 'envoy.type';

/**
 * Envoy uses SemVer (https://semver.org/). Major/minor versions indicate
 * expected behaviors and APIs, the patch version field is used only
 * for security fixes and can be generally ignored.
 */
export interface SemanticVersion {
  majorNumber: number;
  minorNumber: number;
  patch: number;
}

export const ENVOY_TYPE_PACKAGE_NAME = 'envoy.type';
