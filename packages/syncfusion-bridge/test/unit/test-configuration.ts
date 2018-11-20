import { Container } from "aurelia-framework";

export class TestConfiguration {
	/**
	 * @function configureContainer
	 * @param  {(any)[]} registerServicesList The pairs of Real service / Fake service to be registered in the container.
	 * @returns {Container} The container with the registered instances.
	 */
	public static configureContainer(registerServicesList: (any)[]): Container {
		const container = new Container();
		for (const service of registerServicesList) {
			container.registerInstance(service[0], service[1]);
		}
		return container;
	}

	public static setTimeoutTests(done: DoneFn, func: () => void, timeout: number = 1) {
		setTimeout(function () {
			func();
			done();
		}, timeout);
	}
}