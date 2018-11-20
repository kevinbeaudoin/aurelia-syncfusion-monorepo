import { ChangeEventArgs } from "@syncfusion/ej2-buttons/common";
import { bindable } from "aurelia-framework";
import { GeniusCheckbox } from "components/button/genius-checkbox";

export class ButtonSample {
  checkboxCaption: string = "Not Checked";
  @bindable() checkboxValue: boolean = false;

  displayCheckedChanged(args: ChangeEventArgs) {
    alert(args.checked);
  }

  enableDisable(checkbox: GeniusCheckbox) {
    checkbox.gDisabled = !checkbox.gDisabled;
    checkbox.gLabel = checkbox.gDisabled ? "Disabled" : "Enabled";
  }
}
