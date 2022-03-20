import { Noth } from "./noth"

export type Template = TemplateOrigin | Noth
export type TemplateOrigin = {
    name: string,
    childNodes?: Array<Template | string>,
    events?: any[],
    attribute: Attribute;
}
export type Attribute = {
    className: string | Array<string>,
    style: Style,
    [key: string]: string | Array<string> | Style | Function;
}

export type Style = {
    backgroundColor: 'red' | 'blue',
    width: string,
    height: string,
    [key: string]: string
}