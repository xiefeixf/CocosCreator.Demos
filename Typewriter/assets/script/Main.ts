
import { _decorator, Component, Node, LabelComponent, EditBox, EditBoxComponent, Label, ButtonComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Main')
export default class Main extends Component {


    // 这个数组控制文字是否可以继续显示，防止文字乱套
    is_string: boolean[] = [];
    // 之前使用过set_label_stringTW方法的所有label
    label_last: LabelComponent[] = [];



    // 设置label内容以打字机形式显示   label为指定组件，string为显示内容，time为几秒多显示一个字   返回显示完全部文字的所需时间
    set_lable_stringTW (label: LabelComponent, string: string, time: number): number {
        let self = this;

        // 文字可以继续显示
        this.is_string.push(true);
        // 获取控制本次效果是否继续显示的变量号码
        let num = this.is_string.length - 1;

        // 如果不是第一次调用
        if (this.label_last != null) {
            // 利用for循环，将传入的label之前所有的打字机效果文字全部停止显示
            for (let i = 0; i < this.label_last.length; i ++) {
                if (this.label_last[i] == label) {
                    this.is_string[i] = false;
                }
            }
        }
        // 把本次传入的label存起来
        this.label_last.push(label);

        
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
            }, i * time);
        }

        // 返回全部显示完所需时间
        return(str.length * time - time);
    }

}