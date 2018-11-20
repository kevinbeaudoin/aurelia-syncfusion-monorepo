/**
   * Gets the matching UI control property name based on Genius Component property convention.
   *
   * @private
   * @param {string} geniusPropertyName
   * @returns {string}
   * @memberof GeniusControlBase
   */
export function getMatchingPropertyName(geniusPropertyName: string) {
  let propertyName = geniusPropertyName.substring(2);
  propertyName = geniusPropertyName[1].toLocaleLowerCase() + propertyName;
  return propertyName;
}

/**
 * Converts a string from kebab case to camel casing
 * ex: some-var-name -> someVarName
 *
 * @export
 * @param {string} name
 * @returns {string}
 */
export function unhyphenate(name: string): string {
  return name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}
