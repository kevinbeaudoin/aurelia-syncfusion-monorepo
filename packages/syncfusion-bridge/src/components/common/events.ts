import { constants } from "./constants";
import { unhyphenate } from "./naming";

/**
* To get binded events from the element
* @param {any} element The Element from which events acquired
* @returns {any} option
*/
export function getEventOption(element) {
  let name;
  let attr;
  const attributes = element.attributes;
  const option = {};

  for (let i = 0, len = attributes.length; i < len; i++) {
    attr = attributes[i];
    name = attr.name;
    if (!name.startsWith(constants.eventPrefix)) {
      continue;
    }
    const actualEventName = name.split(".")[0];
    const eventName = unhyphenate(actualEventName.split(constants.eventPrefix)[1]);
    option[eventName] = e => fireEvent(element, actualEventName, e);
  }
  return option;
}

/**
* Fire DOM event on an element
* @param {Element} element The Element which the DOM event will be fired on
* @param {string} name The Event's name
* @param {any} data Addition data to attach to an event
* @returns {CustomEvent<any>}
*/
export function fireEvent(element: Element, name: string, data?) {
  const event = new CustomEvent(name, {
    detail: data,
    bubbles: true,
  });
  element.dispatchEvent(event);
  return event;
}
