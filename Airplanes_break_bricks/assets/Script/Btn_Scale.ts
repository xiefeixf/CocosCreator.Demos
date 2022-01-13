const {ccclass, property} = cc._decorator;

@ccclass
export default class Btn_Scale extends cc.Component {

    onLoad () {
        let self = this;

        // 当手指触摸时
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            // 执行放大动作并使用缓动
            var b = cc.scaleTo(0.1, 1.2).easing(cc.easeCircleActionInOut());
            self.node.runAction(b);
        }, this);


        // 两种手指离开按钮时
        // 执行缩小动作并使用缓动
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            var s = cc.scaleTo(0.08, 1);
            self.node.runAction(s);
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            var s = cc.scaleTo(0.08, 1);
            self.node.runAction(s);
        }, this);
    }

}
