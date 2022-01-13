
import { _decorator, Component, Node, BoxColliderComponent, ITriggerEvent, Vec2, LabelComponent, Vec3, WidgetComponent, UITransformComponent, CCString, Layers, log, tween, CCFloat, easing, systemEvent, SystemEventType, EventKeyboard, macro, Tween, Enum, TweenEasing } from 'cc';
const { ccclass, property } = _decorator;

// 缓动类型枚举
enum TweenEasingType {
    linear, smooth, fade, constant, quadIn, quadOut, quadInOut, quadOutIn, cubicIn, cubicOut, cubicInOut, cubicOutIn, quartIn, quartOut, quartInOut, quartOutIn, quintIn, quintOut, quintInOut, quintOutIn, sineIn, sineOut, sineInOut, sineOutIn, expoIn, expoOut, expoInOut, expoOutIn, circIn, circOut, circInOut, circOutIn, elasticIn, elasticOut, elasticInOut, elasticOutIn, backIn, backOut, backInOut, backOutIn, bounceIn, bounceOut, bounceInOut, bounceOutIn,
}

@ccclass('Door')
export class Door extends Component {

    @property({displayName: "开关门需要几秒？", tooltip: "开关门需要几秒", type: CCFloat})
    time: number = 1.5;


    @property({displayName: "开门后门旋转的角度", tooltip: "开门后门旋转的角度", type: Vec3})
    angle: Vec3 = new Vec3(0, -90, 0);


    @property({displayName: "开门所用的缓动", tooltip: "开门所用的缓动", type: Enum(TweenEasingType)})
    TweenEasing_open: TweenEasingType = TweenEasingType.backIn;

    @property({displayName: "关门所用的缓动", tooltip: "关门所用的缓动", type: Enum(TweenEasingType)})
    TweenEasing_close: TweenEasingType = TweenEasingType.elasticInOut;


    @property({displayName: "label父节点", tooltip: "label父节点，角色接触到门的时候会生成一个label显示到屏幕上，以此告诉玩家可以开门了", type: Node})
    label_parent: Node = null!;

    @property({displayName: "label内容", tooltip: "label内容"})
    label_string: string = "F键     将此门打开 / 关闭";

    // 销毁文字函数
    func: Function = null!;

    // 门自身
    door: Node = null!;

    // 门是否开着
    is_open: boolean = false;

    // 缓动类型
    tween: TweenEasing[] = ["linear", "smooth", "fade", "constant", "quadIn", "quadOut", "quadInOut", "quadOutIn", "cubicIn", "cubicOut", "cubicInOut", "cubicOutIn", "quartIn", "quartOut", "quartInOut", "quartOutIn", "quintIn", "quintOut", "quintInOut", "quintOutIn", "sineIn", "sineOut", "sineInOut", "sineOutIn", "expoIn", "expoOut", "expoInOut", "expoOutIn", "circIn", "circOut", "circInOut", "circOutIn", "elasticIn", "elasticOut", "elasticInOut", "elasticOutIn", "backIn", "backOut", "backInOut", "backOutIn", "bounceIn", "bounceOut", "bounceInOut", "bounceOutIn"];
    // 最终开门缓动效果
    tween_last_open: TweenEasing = null!;
    // 最终关门缓动效果
    tween_last_close: TweenEasing = null!;

    onLoad () {
        // 检测角色和门发生碰撞
        this.node.getComponent(BoxColliderComponent)?.on("onTriggerEnter", (event: ITriggerEvent) => {
            // 如果是角色
            if (event.otherCollider.node.name == "Player") {
                console.log("碰撞Player了");

                // 把销毁文字的方法存起来下次用
                this.func = this.add_label();

                // 绑定按下键盘事件
                systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
            }
        });

        // 检测角色和门结束碰撞
        this.node.getComponent(BoxColliderComponent)?.on("onTriggerExit", (event: ITriggerEvent) => {
            // 如果是角色
            if (event.otherCollider.node.name == "Player") {
                // 销毁文字
                this.func();

                // 删除之前绑定的事件
                systemEvent.off(SystemEventType.KEY_DOWN, this.onKeyDown, this);
            }
        });

        // 获取门自身
        this.door = this.node;


        // 指定最终缓动类型
        this.tween_last_open = this.tween[this.TweenEasing_open];
        // 指定最终缓动类型
        this.tween_last_close = this.tween[this.TweenEasing_close];
    }


    // 按下键盘时
    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case macro.KEY.f:
                // console.log("按下了F键，开或关了门");
                if (this.is_open == false) {
                    this.open_door();
                } else if (this.is_open == true) {
                    this.close_door();
                }
                break;
        }
    }


    // 添加文字，返回函数为销毁文字
    add_label (): Function {
        // 创建新label
        let node = new Node();
        node.parent = this.label_parent;
        node.layer = this.label_parent.layer;

        // 添加并获取LabelComponent
        node.addComponent(LabelComponent);
        let label = node.getComponent(LabelComponent)!;

        // 获取文字和父节点UITransformComponent
        let ui0 = node.getComponent(UITransformComponent)!;
        let ui1 = this.label_parent.getComponent(UITransformComponent)!;

        // 设置宽度
        ui0.width = ui1.width;
        
        // 设置文字模式和内容
        label.overflow = LabelComponent.Overflow.SHRINK;
        label.string = this.label_string;
        
        // console.log("生成了label");

        return (function () {
            node.destroy();
        });
    }


    // 开门
    open_door () {
        tween(this.door)
            .to(this.time, {eulerAngles: this.angle}, { easing: this.tween_last_open })
            .start();
            log("开门函数");
        
            this.is_open = true;
    }


    // 关门
    close_door () {
        tween(this.door)
            .to(this.time, {eulerAngles: new Vec3(0, 0, 0)}, { easing: this.tween_last_close })
            .start();
            log("关门函数");

            this.is_open = false;
    }


}