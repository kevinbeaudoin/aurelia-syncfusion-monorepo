import { autoinject, PLATFORM } from "aurelia-framework";
import { I18N } from "aurelia-i18n";
import { Router, RouterConfiguration } from "aurelia-router";

@autoinject()
export class App {
  private router: Router;
  public title: string = "Genius UI Components";

  constructor(public i18n: I18N) {
    this.i18n.setLocale("fr-CA");
  }

  private configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = this.title;
    config.map([
      { route: ["", "home"], name: "home", moduleId: PLATFORM.moduleName("samples/home") },
      { route: "button", name: "button", moduleId: PLATFORM.moduleName("samples/button/button-sample"), nav: true, title: "Button" },
      { route: "checkbox", name: "checkbox", moduleId: PLATFORM.moduleName("samples/checkbox/checkbox-sample"), nav: true, title: "Checkbox" },
    ]);
  }
}
