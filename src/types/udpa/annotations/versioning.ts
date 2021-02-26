/* eslint-disable */
export const protobufPackage = 'udpa.annotations';

export interface VersioningAnnotation {
  /**
   * Track the previous message type. E.g. this message might be
   * udpa.foo.v3alpha.Foo and it was previously udpa.bar.v2.Bar. This
   * information is consumed by UDPA via proto descriptors.
   */
  previousMessageType: string;
}

export const UDPA_ANNOTATIONS_PACKAGE_NAME = 'udpa.annotations';
