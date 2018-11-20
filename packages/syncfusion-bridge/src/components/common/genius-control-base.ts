import { bindable } from "aurelia-framework";
import { constants } from "./constants";
import { getEventOption } from "./events";
import { getMatchingPropertyName } from "./naming";


export class GeniusControlBase {

  /**
   * Custom property to allow assignment of a element id for current control.
   *
   * @type {string}
   * @memberof GeniusControlBase
   */
  @bindable() public gElementId: string;

  /**
   * Enable or disable rendering component in right to left direction.
   *
   * @type {boolean}
   * @memberof GeniusControlBase
   */
  @bindable() public gEnableRtl: boolean;

  /**
   * Overrides the global culture and localization value for this component. Default global culture is 'en-US'.
   *
   * @type {string}
   * @memberof GeniusControlBase
   */
  @bindable() public gLocale: string;

  /**
   * The placeholder control element where the UI control should be inserted.
   *
   * @protected
   * @type {*}
   * @memberof GeniusControlBase
   */
  protected targetElement: Element;

  /**
   * The inserted UI control.
   *
   * @protected
   * @type {*}
   * @memberof GeniusControlBase
   */
  protected uiControl: any;

  /**
   * Custom associative list of genius property to be mapped to a given UI control.
   *
   * @protected
   * @memberof GeniusControlBase
   */
  protected customPropertyMap = {};

  /**
   * Complete associative list of genius property to be mapped to a given UI control.
   * This list is populated automatically as bindable properties in genius component view models are used
   * in code based on the following convention (custom genius components properties start with 'g').
   * Gets initialized with customPropertyMap as default values.
   *
   * @private
   * @memberof GeniusControlBase
   */
  private propertyMap;

  /**
   * Forces the refresh of the related UI Control.
   *
   * @memberof GeniusControlBase
   */
  public refresh() {
    this.uiControl.refresh();
  }

  /**
   * Gets the list of UI options as defined in the related view model.
   * @param  {Element} controlElement
   * @protected
   * @memberof GeniusControlBase
   * @returns {any}
   */
  protected getUiControlOptions(controlElement: Element) {
    const options = getEventOption(controlElement);
    for (const name in this) {
      if (name.startsWith(constants.bindablePrefix)) {
        if (this.customPropertyMap.hasOwnProperty(name)) {
          const customName = this.customPropertyMap[name.toString()];
          options[getMatchingPropertyName(name)] = this[customName];
        }
        else {
          options[getMatchingPropertyName(name)] = this[name];
        }
      }
    }
    return options;
  }

  /**
   * Aurelia event called when view models bindable properties change value.
   * This is where we map component custom properties to their matching UI component.
   *
   * @param {string} propertyName
   * @param {*} newValue
   * @param {*} oldValue
   * @memberof GeniusControlBase
   */
  // tslint:disable-next-line:no-unused
  protected propertyChanged(propertyName: string, newValue: any, oldValue: any) {

    if (!this.propertyMap) {
      this.propertyMap = this.customPropertyMap;
    }

    if (this.uiControl) {
      if (this.propertyMap.hasOwnProperty(propertyName)) {
        this.uiControl[this.propertyMap[propertyName]] = newValue;
      } else if (propertyName.startsWith(constants.bindablePrefix)) {
        const controlPropertyName = getMatchingPropertyName(propertyName);
        if (controlPropertyName in this.uiControl) {
          this.propertyMap[propertyName] = controlPropertyName;
          this.uiControl[controlPropertyName] = newValue;
        }
      }
    }
  }

  /**
   * Destroys UI control as Aurelia components gets detached.
   *
   * @memberof GeniusControlBase
   */
  protected detached() {
    this.uiControl.destroy();
  }
}
