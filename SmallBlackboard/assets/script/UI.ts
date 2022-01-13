// 导入main脚本
import main, { Type } from "./Main";

import { _decorator, Component, Node, GraphicsComponent, SpriteComponent, color, systemEvent, SystemEventType, log, error, SliderComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UI')
export class UI extends Component {
    
    @property({displayName: "笔刷", tooltip: "笔刷", type: GraphicsComponent})
    brush: GraphicsComponent = null!;

    @property({displayName: "当前颜色", tooltip: "当前画笔 / 橡皮的颜色", type: SpriteComponent})
    cur_color: SpriteComponent = null!;

    @property({displayName: "设置画笔颜色块的父节点", tooltip: "设置画笔颜色的颜色块的父节点", type: Node})
    color_parent: Node = null!;

    @property({displayName: "Main脚本所在节点", tooltip: "Main脚本所在节点", type: main})
    main: main = null!;

    @property({displayName: "画笔宽度滑动器", tooltip: "画笔宽度滑动器", type: SliderComponent})
    brush_width_sl: SliderComponent = null!;

    @property({displayName: "橡皮大小滑动器", tooltip: "橡皮大小滑动器", type: SliderComponent})
    eraser_width_sl: SliderComponent = null!;

    onLoad () {
        let self = this;

        // 给每个颜色块绑定事件
        for (let i = 0; i < this.color_parent.children.length; i++) {
            this.color_parent.children[i].on(SystemEventType.TOUCH_START, function () {
                // 设置笔刷颜色
                let color = self.color_parent.children[i].getComponent(SpriteComponent)!.color;
                self.main.brush_color = color;
            }, this);
        }
    }

    update () {
        // 当前颜色为笔刷颜色
        this.cur_color.color = this.brush.strokeColor;

        // 如果滑动器数值过小就手动设置线宽和大小，如果不就正常设置
        if (this.brush_width_sl.progress <= 0.01 || this.eraser_width_sl.progress <= 0.01) {
            this.main.brush_width = 0.1 * 15;
            this.main.eraser_width = 0.1 * 30;
            return;
        }
        this.main.brush_width = this.brush_width_sl.progress * 15;
        this.main.eraser_width = this.eraser_width_sl.progress * 30;
    }


    // 清除所有绘制专用函数
    onbtn_clear () {
        this.brush.clear();
    }

    // 笔刷模式专用函数
    set_brush () {
        this.main.type = Type.brush;
    }

    // 橡皮模式专用函数
    set_eraser () {
        this.main.type = Type.eraser;
    }


}