/* eslint-disable */
export const protobufPackage = 'udpa.annotations';

export enum PackageVersionStatus {
  /** UNKNOWN - Unknown package version status. */
  UNKNOWN = 0,
  /** FROZEN - This version of the package is frozen. */
  FROZEN = 1,
  /** ACTIVE - This version of the package is the active development version. */
  ACTIVE = 2,
  /**
   * NEXT_MAJOR_VERSION_CANDIDATE - This version of the package is the candidate for the next major version. It
   * is typically machine generated from the active development version.
   */
  NEXT_MAJOR_VERSION_CANDIDATE = 3,
  UNRECOGNIZED = -1,
}

export interface StatusAnnotation {
  /** The entity is work-in-progress and subject to breaking changes. */
  workInProgress: boolean;
  /** The entity belongs to a package with the given version status. */
  packageVersionStatus: PackageVersionStatus;
}

export const UDPA_ANNOTATIONS_PACKAGE_NAME = 'udpa.annotations';
