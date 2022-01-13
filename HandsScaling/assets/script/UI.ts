// 导入Main脚本
import main from "./Main";

import { _decorator, Component, Node, SliderComponent, Slider } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UI')
export class UI extends Component {

    @property({displayName: "Main脚本所在节点", tooltip: "Main脚本所在节点", type: main})
    main: main = null!;

    @property({displayName: "缩放灵敏度滑动器", tooltip: "缩放灵敏度滑动器", type: SliderComponent})
    UI: SliderComponent = null!;

    // 滑动滑动器时调用
    onslide () {
        if (this.UI.progress >= 0.01) {
            // 设置灵敏度
            this.main.SPL = this.UI.progress;
        } else {
            // 设置灵敏度
            this.main.SPL = 0.01;
        }
    }
    
}