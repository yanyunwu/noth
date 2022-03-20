export default class Box {
    // 存储的DOM对象
    private $dom: HTMLDivElement;
    constructor() {
        this.$dom = document.createElement('div');
    }
}