import { Noth, NothConfig } from "./noth";

export class BaseNoth {
    /** 将普通对象转换为Noth对象 */
    static extends: (config: NothConfig) => Noth;
}