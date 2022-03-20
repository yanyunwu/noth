/** 对象代理者 */
export class NuthProxy {
    static target: Watcher | null;
    data: {};
    map: Map<string | symbol, Array<Watcher>>;

    constructor(data: {}) {
        this.map = new Map<string | symbol, Watcher[]>();
        let that = this;
        /** 将当前data对象设为代理 */
        this.data = new Proxy(data, {

            set(target, prop, value): boolean {
                // console.log(target, `上的${String(prop)}属性更新为${value}了`);
                (target as any)[prop] = value;
                that.notify(prop, value);
                return true;
            },

            get(target, prop, _receiver) {

                if (that.map.has(prop)) {
                    NuthProxy.target && that.map.get(prop)!.push(NuthProxy.target)
                } else {
                    let arr: Array<Watcher> = [];
                    NuthProxy.target && arr.push(NuthProxy.target)
                    that.map.set(prop, arr);
                }
                return (target as any)[prop]
            }
        })
    }

    getProxy() {
        return this.data;
    }

    /** 通知watcher更新数据 */
    notify(prop: string | symbol, value: any): void {
        // console.log(prop);
        // console.log(this.map);


        let WatcherList = this.map.get(prop);
        WatcherList?.forEach((watcher) => {
            watcher.update(value)
        })
    }

}

/** 数据监听者 */
export class Watcher {
    cb: (value: string | null) => void;
    constructor(cb: Function) {
        NuthProxy.target = this;
        this.cb = cb()
        NuthProxy.target = null;

    }

    /** 属性更新 */
    update(value: string | null): void {
        this.cb(value)
    }
}