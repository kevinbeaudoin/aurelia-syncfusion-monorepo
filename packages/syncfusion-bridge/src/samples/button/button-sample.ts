import { ItemModel } from "@syncfusion/ej2-splitbuttons";
import { GeniusButton } from "components/button/genius-button";

export class ButtonSample {
  public buttonCaption: string = "Bound Button";
  public bindingButtonCaption: string = "Binding Button";
  public buttonCssClass: string = "e-primary";
  public enableDisableCaption: string = "Enable";
  public enableDisableClass: string = "e-primary";
  public enableDisableStatus: boolean = false;
  public testField: string = "";

  public itemList: ItemModel[] = [
    {
      text: "asc",
    },
    {
      text: "desc",
    },
    {
      text: "group",
    }
  ];

  public test(button: GeniusButton) {
    alert(`${button.gHtmlContent} clicked`);
  }

  public changeCaption() {
    this.buttonCaption = "Clicked!";
    this.bindingButtonCaption = "Changed";
    this.buttonCssClass = "e-primary";
  }

  /**
   * Example class to change Binding Button description and class
   */
  public changeBindingButton(){
    if (this.bindingButtonCaption === "Changed"){
      this.bindingButtonCaption = "Binding Button";
      this.buttonCssClass = "e-primary";
    } else {
      this.bindingButtonCaption = "Changed";
      this.buttonCssClass = "e-secondary";
    }
  }

  /**
   * This method is used for the enable/disable
   * button example.
   */
  public enableDisable() {
    if (this.enableDisableCaption === "Enable"){
      this.enableDisableCaption = "Disable";
      this.enableDisableClass += " e-disabled";
      this.enableDisableStatus = true;
    } else {
      this.enableDisableCaption = "Enable";
      this.enableDisableClass = "e-primary";
      this.enableDisableStatus = false;
    }
  }

  public selectItem(args) {
    alert(`Item ${args.item.text} selected.`);
  }

  /**
   * This method is just to be used for the type buttons
   * example
   */
  public testSendForm(){
    alert("You have submited the follow value: " + this.testField);
  }
}
