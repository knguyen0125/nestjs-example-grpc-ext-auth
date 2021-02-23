/* eslint-disable */
export const protobufPackage = 'udpa.annotations';

export interface MigrateAnnotation {
  /** Rename the message/enum/enum value in next version. */
  rename: string;
}

export interface FieldMigrateAnnotation {
  /** Rename the field in next version. */
  rename: string;
  /**
   * Add the field to a named oneof in next version. If this already exists, the
   * field will join its siblings under the oneof, otherwise a new oneof will be
   * created with the given name.
   */
  oneofPromotion: string;
}

export interface FileMigrateAnnotation {
  /**
   * Move all types in the file to another package, this implies changing proto
   * file path.
   */
  moveToPackage: string;
}

export const UDPA_ANNOTATIONS_PACKAGE_NAME = 'udpa.annotations';
