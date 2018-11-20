/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>
// we want font-awesome to load as soon as possible to show the fa-spinner
import { Aurelia } from "aurelia-framework";
import { Backend, TCustomAttribute } from "aurelia-i18n";
import { PLATFORM } from "aurelia-pal";
import * as Bluebird from "bluebird";
import environment from "./environment";

// remove out if you don"t want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName("aurelia-i18n"), (instance) => {
      const aliases = ["t", "i18n"];
      // add aliases for 't' attribute
      TCustomAttribute.configureAliases(aliases);

      // register backend plugin
      instance.i18next.use(Backend.with(aurelia.loader));

      return instance.setup({
        backend: {                                  // <-- configure backend settings
          loadPath: "locales/{{lng}}/{{ns}}.json", // <-- XHR settings for where to get the files from
        },
        attributes: aliases,
        lng: "en-CA",
        fallbackLng: "en-US",
        debug: true,
      });
    })
    .feature(PLATFORM.moduleName("resources/index"));


  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName("aurelia-animator-css"));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName("aurelia-html-import-template-loader"));

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName("aurelia-testing"));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName("app")));
}
