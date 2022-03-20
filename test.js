import { Noth } from './src/index';
import './src/test.css'
const Part = Noth.extends({
    constructor() {

    },
    data: {
        aa: 2
    },
    template: {
        name: 'div',
        childNodes: [
            {
                name: 'span',
            },
            {
                name: 'span',
                childNodes: [
                    '{{aa}}'
                ],
                attribute: {
                    style: {
                        cursor: 'pointer'
                    },
                    $click: test
                }
            },
            'aaa'
        ],
        attribute: {
            className: ['test', 'aaa'],
            style: {
                backgroundColor: 'blue',
                color: 'red'
            }
        }
    },

})
let num = 0;
function test() {
    this.data.aa = num;
    num++;
}

new Noth({
    constructor() {
        // console.log('根组件创建！');
        // this.data.aa = 4
        // setTimeout(() => {
        this.data.aa = 5
        console.log(this);
        this.hook('onReady', function () {
            console.log('准备钩子');
        })
        // }, 3000)
    },
    template: Part,
    target: 'box',
    data: {
        aa: 3
    },
}).mount();

new Noth()