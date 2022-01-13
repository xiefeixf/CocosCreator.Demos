
import { _decorator, Component, Node, ButtonComponent, Vec3, SystemEventType, LabelComponent, CCFloat, CCString, error } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Guide')
export class Guide extends Component {

    @property({displayName: "按钮", tooltip: "按钮，请按想要引导的顺序绑定", type: ButtonComponent})
    all_btn: ButtonComponent[] = [];

    @property({displayName: "遮挡节点", tooltip: "遮挡节点", type: Node})
    mask: Node = null!;

    @property({displayName: "半透明精灵", tooltip: "半透明精灵", type: Node})
    sprite: Node = null!;

    @property({displayName: "引导手", tooltip: "白色的手，用来指向按钮的", type: Node})
    hand: Node = null!;

    @property({
        displayName: "引导文字内容", 
        tooltip: "引导的文字内容，绑定了多少个按钮就要有多少个文字内容，如果文字内容数量少于按钮数量会出现错误", 
        type: CCString
    })
    label_string: string[] = [];

    @property({displayName: "引导的文字", tooltip: "引导的文字", type: LabelComponent})
    label: LabelComponent = null!;

    @property({displayName: "每几秒多显示一个字", tooltip: "打字机每几秒多显示一个字", type: CCFloat})
    label_time: number = 0.1;

    // 每个按钮的位置
    pos: Vec3[] = [];
    // 当前进行到了第几个按钮
    num: number = 0;

    // 引导的文字是否可以继续显示，如果用户在打字机文字全部显示出来之前点击下一个按钮，就会出现文字乱套的现象，这个变量就是防止文字乱套所做的
    is_string: boolean[] = [];

    onLoad () {
        let self = this;

        // 给每个按钮绑定onbtn方法
        for (let i = 0; i < this.all_btn.length; i++) {
            this.all_btn[i].node.on(SystemEventType.TOUCH_END, function () {
                self.onbtn();
            }, this);
        }

        // 记录每个按钮的位置
        for (let i = 0; i < this.all_btn.length; i++) {
            this.pos.push(this.all_btn[i].node.position);
        }

        // 遮罩位置到第一个按钮
        this.mask.position = this.pos[0];

        // 设置文字显示内容
        this.set_lable_string(this.label, this.label_string[0]);

        if (this.label_string.length < this.all_btn.length) {
            error("引导文字内容的数量少于按钮的数量，请在编辑器添加引导文字，否则会出现错误");
        }
    }



    update () {
        // 如果遮挡节点还没被销毁就往下执行
        if (this.mask.isValid == false) {
            return;
        }
        // 精灵的位置必须是负的这样才能填充整个屏幕
        this.sprite.position = new Vec3(-this.mask.position.x, -this.mask.position.y, 1.0);
        // 引导手的位置和遮挡节点的位置一样   引导手的锚点是0.5, 1
        this.hand.position = this.mask.position;
    }

    // 点击按钮专用函数
    onbtn () {
        // 更新进行到哪个按钮
        this.num ++;

        // console.log("num", this.num, "allbtn长度", this.all_btn.length);

        // 如果所有按钮都进行过了
        if (this.num >= this.all_btn.length) {
            // 销毁手和遮挡节点和引导文字
            this.mask.destroy();
            this.hand.destroy();
            this.label.destroy();
            // 点击按钮什么也不发生
            this.onbtn = function () {};
            console.log("新手引导完毕！！！mask，hand和label节点已经销毁");

            // 销毁本脚本
            this.destroy();

            return;
        }

        // 设置文字显示内容
        this.set_lable_string(this.label, this.label_string[this.num]);
        // 遮挡节点到按钮的位置
        this.mask.position = this.pos[this.num];
    }

    // 设置label显示内容   打字机效果   label为指定组件，string为显示内容
    set_lable_string (label: LabelComponent, string: string) {
        let self = this;

        // 文字可以继续显示
        this.is_string.push(true);
        let num = this.is_string.length - 1;
        // 上一次文字不可以继续显示
        this.is_string[num - 1] = false;

        // 设置显示内容为空
        label.string = "";
        // 将文本截成一个字一个字的数组
        let str: string[] = string.split("");

        // for循环利用定时器实现打字机效果
        for (let i = 0; i < str.length; i++) {
            // 文本的每个字
            let string = str[i];
            this.scheduleOnce(function () {
                // 如果可以显示
                if (self.is_string[num] == true) {
                    // 显示给label
                    label.string = label.string + string;
                }
            }, i * this.label_time);
        }
    }

}