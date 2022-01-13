// 导入Main脚本
import main from "./Main";

import { _decorator, Component, Node, EditBoxComponent, LabelComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UI')
export class UI extends Component {

    @property({displayName: "Main脚本所在节点", tooltip: "Main脚本所在节点", type: main})
    main: main = null!;

    @property({displayName: "文字", tooltip: "文字", type: LabelComponent})
    label: LabelComponent = null!;

    @property({displayName: "输入框", tooltip: "输入框", type: EditBoxComponent})
    input: EditBoxComponent = null!;

    @property({displayName: "时间输入框", tooltip: "时间输入框", type: EditBoxComponent})
    input_time: EditBoxComponent = null!;

    // 按钮
    onbtn () {
        // 如果输入框输入的是数字
        if (isNaN(Number(this.input_time.string)) == false) {
            let time = this.main.set_lable_stringTW(this.label, this.input.string, Number(this.input_time.string));
            this.scheduleOnce(() => {
                console.log("打字机效果显示完毕，所用时间：", time);
            }, time);
        } else {
            this.input_time.string = "请你输入一个数字";
        }
    }

}