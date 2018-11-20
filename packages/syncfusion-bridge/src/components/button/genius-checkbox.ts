import { ChangeEventArgs, CheckBox, LabelPosition } from "@syncfusion/ej2-buttons";
import { bindable, inject } from "aurelia-framework";
import { GeniusControlBase } from "../common/genius-control-base";

/**
 * https://ej2.syncfusion.com/documentation/check-box/api-checkBox.html?lang=typescript
 *
 * @export
 * @class GeniusCheckbox
 * @extends {GeniusControlBase}
 */
@inject(Element)
export class GeniusCheckbox extends GeniusControlBase {
  @bindable() public gChecked: boolean;
  @bindable() public gCssClass: string;
  @bindable() public gDisabled: boolean;
  @bindable() public gEnablePersistence: string;
  @bindable() public gIndeterminate: boolean;
  @bindable() public gLabel: string;
  @bindable() public gLabelPosition: LabelPosition;
  @bindable() public gName: string;
  @bindable() public gValue: string;

  constructor(private controlElement: Element) {
    super();
  }

  protected attached() {
    const options = this.getUiControlOptions(this.controlElement);
    this.hookTwoWayBinding(options);
    this.uiControl = new CheckBox(options);
    this.uiControl.appendTo(this.targetElement);
  }

  protected onChange(args: ChangeEventArgs) {
    this.gChecked = args.checked;
  }

  //todo we can do better...
  private hookTwoWayBinding(options: any) {
    if (!options.change) {
      options.change = this.onChange.bind(this);
    } else {
      const originalChange = options.change;
      options.change = (args) => {
        this.onChange(args);
        originalChange(args);
      };
    }
  }

}
