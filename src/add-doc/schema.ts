/**
 * Using the same model for options as
 * Scully ng-add-blog schematic
 */
export interface Schema {
  /**
   * add the title for the post
   */
  name?: string;
  /**
   * add the title for the doc post
   */
  title?: string;
  /**
   * define the target directory for the new post file
   */
  target?: string;
  /**
   * define the file extension for the target file
   */
  extension?: string;
  /**
   * override the post description
   */
  description?: string;
}
