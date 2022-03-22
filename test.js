import { Noth } from './src/index';
import './src/test.css'


function retSpanList() {
    let a = [];
    for (let i = 0; i < 6; i++) {
        a.push({
            name: 'span', childNodes: ['{{aa}}'],
            attribute: {
                style: { cursor: 'pointer' },
                $click() {
                    this.data.aa = i;
                }
            },
        })
    }

    return a
}

function Multiple(list, callback) {
    let newL = []
    for (let item of list) {
        newL.push(callback(item));
    }

    return newL
}


let results = Multiple([6, 7, 8, 9], function (value) {
    let zj = {
        name: 'button', childNodes: ['{{aa}}'],
        attribute: {
            style: { cursor: 'pointer' },
            $click() {
                this.data.aa = value;
            }
        },
    }
    return zj
})

const Part = Noth.extends({
    constructor() {
        console.log('Part组件', this.data.aa);
    },
    data: {
        aa: 2
    },
    template: {
        name: "div",
        childNodes: [
            { name: 'span' },
            {
                name: 'button', childNodes: ['{{aa}}'],
                attribute: {
                    style: { cursor: 'pointer' },
                    $click() {
                        console.log(this);
                        this.data.aa = 1;
                    }
                },
            },
            ...results,
            'aaa'
        ],
        attribute: {
            className: ['test', 'aaa'],
            style: {
                backgroundColor: 'blue',
                color: 'red'
            },


        }
    },

})


new Noth({
    constructor() {
        // console.log('根组件创建！');
        // this.data.aa = 4
        // setTimeout(() => {
        // this.data.aa = 5
        console.log(this);
        this.hook('onReady', function () {
            console.log('准备钩子');
        })
        // }, 3000)
    },
    template: {
        name: 'div',
        childNodes: [
            Part,
            {
                name: 'button',
                childNodes: ['{{aa}}'],
                attribute: {
                    $click() {
                        this.data.aa = 1000
                    }
                }
            }
        ]
    },
    target: 'box',
    data: {
        aa: 3
    },
}).mount();