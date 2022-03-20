import { Builder } from './builder'
import { Template, TemplateOrigin } from './type'
import { BaseNoth } from './baseNoth'
import { NuthProxy } from './proxy';

/** 组件对象配置 */
export interface NothConfig {
    constructor?: (this: Noth) => void;
    data?: { [key: string]: any },
    template: TemplateOrigin;
    target?: string;
    [key: string]: any;
}

export interface Noth {
    extends(noth: Noth): Noth;
    extends(noth: NothConfig): Noth;
    extends(noth: Noth | NothConfig): Noth;
}

interface LifeCycle {
    /** 初始化完毕组件准备开始渲染 */
    onReadyList: Function[];
    /** 组件渲染完毕 */
    onLoadList: Function[];
    /** 组件销毁 */
    onEndList: Function[];
    [key: string]: Function[];
}

/** 主对象 */
export class Noth extends BaseNoth {
    /** 主配置 */
    readonly config: NothConfig;
    data: { [key: string]: string };
    lifeCycle: LifeCycle = { onReadyList: [], onLoadList: [], onEndList: [] };

    constructor(config?: NothConfig) {
        // console.log(config);
        super();
        this.config = {
            ...config
        } as NothConfig
        let data = this.config.data || {}
        this.data = new NuthProxy(data).getProxy();
        let constructor = this.config.constructor;
        constructor && constructor.call(this);
        this.lifeCycle.onReadyList.forEach((cb) => {
            cb();
        })

    }

    mount(target?: string): void {
        // console.log(this);


        const mount = (target: string) => document.getElementById(target)?.appendChild(GenerateTemplate(this))

        if (typeof target === "string") {
            // console.log(`在${target}上渲染`);
            mount(target);
        } else if (typeof this.config.target === "string") {
            // console.log(`在${this.config.target}上渲染`);
            mount(this.config.target)
        } else {
            throw new Error('没有指定渲染的对象！');
        }
    }

    /** 设置生命周期钩子 */
    hook(lifeType: 'onReady' | 'onLoad' | 'onEnd', cb: Function): void {
        this.lifeCycle[lifeType + 'List'].push(cb.bind(this));
    }

    /** 创建一个新的Noth对象 */
    static extends(config: NothConfig): Noth {
        return new Noth(config)
    }

}

// 生成模板的方法
function GenerateTemplate(noth: Noth): HTMLElement {

    return new Builder(noth).treeBuild();
    // return document.createElement('div')
}
