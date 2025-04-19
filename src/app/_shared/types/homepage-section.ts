/**
 * Types for homepage sections and feature cards.
 */

/**
 * Feature card data structure.
 */
export type HomepageFeature = {
  /** Static image import path */
  readonly imageSrc?: string;
  /** Title of the feature */
  readonly title: string;
  /** Short description */
  readonly description: string;
};

/**
 * Props for the FeaturesSection component.
 */
export type FeaturesSectionProps = {
  readonly features: readonly HomepageFeature[];
};
