/* tslint:disable */
import { CLIOptions, Project, ProjectItem, UI } from "aurelia-cli";
import { inject } from "aurelia-dependency-injection";
const path = require("path");

@inject(Project, CLIOptions, UI)
export default class TestedComponentGenerator {
    constructor(private project: Project, private options: CLIOptions, private ui: UI) { }

    public execute() {
        const self = this;

        return this.ui
            .ensureAnswer(this.options.args[0], "What would you like to call the component?")
            .then(name => {

                return self.ui.ensureAnswer(this.options.args[1],
                    "What sub-folder would you like to add it to?\nIf it doesn't exist it will be created for you.\n\nBase folder is src/components/.",
                    ".")
                    .then(subFolders => {
                        const fileName = this.project.makeFileName(name);
                        const className = this.project.makeClassName(name);
                        const componentsPath = "components";

                        self.project.root.add(
                            ProjectItem.text(path.join(componentsPath, subFolders, fileName + ".ts"), this.generateTSSource(className)),
                            ProjectItem.text(path.join(componentsPath, subFolders, fileName + ".html"), this.generateHTMLSource()),
                            ProjectItem.text(path.join("../test/unit/", componentsPath, subFolders, fileName + ".spec.ts"), this.generateSpecSource(className, fileName, subFolders))
                        );

                        return this.project.commitChanges()
                            .then(() => this.ui.log(`Created ${name} in the '${path.join(self.project.root.name, componentsPath, subFolders)}' folder`));
                    });
            });
    }

    public generateTSSource(className) {
        return `import { autoinject, bindable } from "aurelia-framework";
import { GeniusControlBase } from "../common/genius-control-base";

/**
 * Add link to Syncfusion doc here
 *
 * @export
 * @class ${className}
 * @extends {GeniusControlBase}
 */
@autoinject()
export class ${className} extends GeniusControlBase {
    /* Add all necessary bindables here */
    @bindable() public gElementId: string;

    constructor(private controlElement: Element) {
        super();
    }

    public attached() {
        //Create new element here
        //this.uiControl = new /* Insert class here */(this.getUiControlOptions(this.controlElement));
        this.uiControl.appendTo(this.targetElement);
    }
}`;
    }

    public generateHTMLSource() {
        return `<template>
    <div id.bind="gElementId" ref="targetElement"></div>
</template>`;
    }

    public generateSpecSource(classname, fileName, subPath) {
        return `import { bootstrap } from "aurelia-bootstrapper";
import { PLATFORM } from "aurelia-pal";
import { StageComponent } from "aurelia-testing";
import { ${classname} } from "../../../../src/components/${subPath}/${fileName}";

describe("The ${classname} component", () => {
    let sut: ${classname};
    let component;

    beforeEach(() => {
      component = StageComponent
        .withResources(PLATFORM.moduleName("components/${subPath}/${fileName}"))
        .inView("<${fileName}></${fileName}>")
        .boundTo({});
    });

    afterEach(() => {
      component.dispose();
     });

    it("validates", (done) => {
        component.create(bootstrap).then(() => {
            fail("Not Implemented");
            done();
        });
    });
});`;
    }
}
