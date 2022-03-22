import { Noth } from "./noth"

/** 模板类型 原始对象或者Noth对象 */
export type Template = TemplateOrigin | Noth
export type TemplateOrigin = {
    name: EleName,
    childNodes?: Array<Template | string>,
    events?: any[],
    attribute: Attribute;
}

export type Attribute = {
    /** 定义css类属性 */
    className?: string | Array<string>,
    style?: Style,
    [key: string]: string | Array<string> | Style | AttrEvent | undefined
} & { [K in EventType]: AttrEvent }

export type AttrEvent = (this: Noth) => void;

/** 定义style属性 */
export type Style = {
    backgroundColor: 'red' | 'blue',
    width: string,
    height: string,
    cursor: 'pointer'
    [key: string]: string
}

/** 定义自带标签 */
export type EleName = 'div' | 'span' | 'button'
/** 定义自带事件属性 */
export type EventType = '$click' | '$touch'