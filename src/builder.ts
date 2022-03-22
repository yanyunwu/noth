import { Noth, NothConfig } from './noth';
import { NuthProxy, Watcher } from './proxy';
import { Template, TemplateOrigin } from './type'

/** 负责构建DOM的类 */
export class Builder {
    template: Template;
    noth: Noth;
    constructor(noth: Noth) {
        // console.log(noth);

        this.noth = noth;
        this.template = noth.config.template;
    }

    treeParse() {

    }

    treeBuild(): HTMLElement {

        const tp = this.template;
        return this.buildForNoth(tp, this.noth);
    }

    /** 递归解析函数 */
    public buildForNoth: (tpl: Template, noth: Noth) => HTMLElement = buildForNoth;
    /** 元素解析函数uu */
    public ElementParser: () => void = ElementParser;
    /** 文本解析函数 */
    public TextParser: (text: string, noth: Noth) => Text[] = TextParser;
    /** 事件解析函数 */
    public EventParser: () => void = EventParser;
    /** style解析函数 */
    /** class解析函数 */
}


/**
 * 如果传入的是Noth对象，则先提取内部的template模板
*/
function buildForNoth(template: Template, noth: Noth): HTMLElement {
    /** 先将当前模板对象的noth设为主noth */
    // let noth = this.noth;

    /** 类型判断 */
    let tp: TemplateOrigin;
    if (template instanceof Noth) {
        // noth = template // 如果当前模板就是一个noth对象
        // tp = template.config.template
        return buildForNoth(template.config.template, template)
    } else {
        tp = template
    }

    /** 创建元素节点 */
    const name = tp.name;
    let ele = document.createElement(name);

    /** class属性添加 */
    let className = tp.attribute?.className;
    if (typeof className === "string") {
        ele.className = className;
    } else if (className instanceof Array) {
        className.forEach((cls) => {
            ele.classList.add(cls)
        })
    }

    /** style属性标准化 */
    let style = tp.attribute?.style;
    // for ( let attr in style){
    //     ele.style[attr as any] = style[attr];
    // }

    /** style属性添加 */
    for (let attr in style) {
        ele.style[attr as any] = style[attr];
    }

    /** 事件添加 */
    if (tp.attribute) {
        for (let prop in tp.attribute) {
            let cb = tp.attribute[prop];
            if (/^\$/.test(prop) && typeof cb === 'function') {
                ele.addEventListener('click', function () {
                    (cb as Function).call(noth);
                })
            }
        };
    }


    /** 递归操作 */
    if (tp.childNodes && tp.childNodes.length) {
        tp.childNodes.forEach((tp) => {
            if (typeof tp === "string") {
                TextParser(tp, noth).forEach((textNode) => {
                    ele.appendChild(textNode)
                })
            } else {


                ele.appendChild(buildForNoth(tp, noth) as HTMLElement);


            }

        });
    }
    return ele;
}

/** 元素解析模块 */
function ElementParser() {

}

/** text文本解析模块 */
function TextParser(text: string, noth: Noth): Text[] {
    let textList = text.match(/\{\{(.*?)\}\}/g) || []

    return textList.map(text => {
        let prop = text.replace(/(\{\{)|(\}\})/g, '');
        let textNode = document.createTextNode('');

        // 对于text节点的实现
        new Watcher(function () {
            // let textNode = document.createTextNode(text);
            textNode.nodeValue = noth.data[prop];

            return function (value: string | null) {
                textNode.nodeValue = value;
            }
        })

        return textNode;
    })
}

/** 事件解析模块 */
function EventParser() {

}

