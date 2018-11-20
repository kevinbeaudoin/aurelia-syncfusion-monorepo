import { bootstrap } from "aurelia-bootstrapper";
import { PLATFORM } from "aurelia-pal";
import { StageComponent } from "aurelia-testing";
import { GeniusButton } from "../../../../src/components/button/genius-button";

describe("The Genius Button component", () => {
  let sut: GeniusButton;
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName("components/button/genius-button"))
      .inView('<genius-button g-element-id="testbutton" g-html-content="Test"></genius-button>')
      .boundTo({});
  });

  afterEach(() => {
    component.dispose();
  });

  it("should gets created", (done) => {
    component.create(bootstrap).then(() => {
      return component.waitForElement(".e-btn").then((buttonElement) => {
        sut = component.viewModel;
        expect(buttonElement.innerText).toBe("Test");
        expect(sut.gElementId).toBe("testbutton");
        done();
      });
    }).catch(e => {
      fail(e.toString());
      done();
    });
  });
});
