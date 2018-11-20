import { bootstrap } from "aurelia-bootstrapper";
import { PLATFORM } from "aurelia-pal";
import { StageComponent } from "aurelia-testing";
import { GeniusCheckbox } from "../../../../src/components/button/genius-checkbox";

describe("The Genius Checkbox component", () => {
  let sut: GeniusCheckbox;
  let component;
  let model;

  beforeEach(() => {
    model = new TestModel();
    component = StageComponent
      .withResources(PLATFORM.moduleName("components/button/genius-checkbox"))
      .inView('<genius-checkbox g-element-id="testcheckbox" g-label="Test"></genius-checkbox>')
      .boundTo(model);
  });

  afterEach(() => {
    component.dispose();
  });

  it("should gets created", (done) => {
    component.create(bootstrap).then(() => {
      return component.waitForElement(".e-label").then((checkboxLabelElement) => {
        sut = component.viewModel;
        expect(checkboxLabelElement.innerText).toBe("Test");
        expect(sut.gElementId).toBe("testcheckbox");
        done();
      });
    }).catch(e => {
      fail(e.toString());
      done();
    });
  });

  it("should call change in two way binding", (done) => {
    component = StageComponent
      .withResources(PLATFORM.moduleName("components/button/genius-checkbox"))
      .inView('<genius-checkbox g-element-id="testcheckbox" g-label="Test" g-on-change.trigger="checkedChanged($event.detail)" ></genius-checkbox>')
      .boundTo(model);
    component.create(bootstrap).then(() => {
      return component.waitForElement(".e-label").then((checkboxLabelElement: HTMLElement) => {
        sut = component.viewModel;

        checkboxLabelElement.click();

        expect(sut.gChecked).toBe(true);
        expect(model.checkboxValue).toBe(true);
        done();
      });
    }).catch(e => {
      fail(e.toString());
      done();
    });
  });
});

class TestModel {
  public checkboxValue: boolean = false;
  public checkedChanged(args) {
    this.checkboxValue = args.checked;
  }
}
