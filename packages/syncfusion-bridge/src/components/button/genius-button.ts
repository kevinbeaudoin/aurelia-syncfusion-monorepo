import { Button } from "@syncfusion/ej2-buttons";
import { inject } from "aurelia-dependency-injection";
import { bindable } from "aurelia-framework";
import { GeniusControlBase } from "../common/genius-control-base";

/**
 * https://ej2.syncfusion.com/documentation/button/api.html?lang=typescript
 *
 * @export
 * @class GeniusButton
 * @extends {GeniusControlBase}
 */
@inject(Element)
export class GeniusButton extends GeniusControlBase {
  @bindable() public gContent: string;
  @bindable() public gHtmlContent: string;
  @bindable() public gCssClass: string;
  @bindable() public gDisabled: boolean;
  @bindable() public gEnablePersistence: boolean;
  @bindable() public gIconCss: string;
  @bindable() public gIconPosition: string;
  @bindable() public gIsPrimary: string;
  @bindable() public gIsToggle: boolean;
  @bindable() public gElementId: string;

  constructor(private controlElement: Element) {
    super();
  }

  protected attached() {
    this.uiControl = new Button(this.getUiControlOptions(this.controlElement));
    this.uiControl.appendTo(this.targetElement);
  }
}
