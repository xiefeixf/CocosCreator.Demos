
import { _decorator, Component, Node, EventTouch, CameraComponent, UITransformComponent, Vec3, Vec2, LabelComponent, systemEvent, SystemEventType, CCFloat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Main')
export default class Main extends Component {

    @property(UITransformComponent)
    canvas: UITransformComponent = null!;

    @property({displayName: "相机", tooltip: "相机", type: CameraComponent})
    camera: CameraComponent = null!;

    @property({displayName: "目标节点", tooltip: "目标节点", type: Node})
    target: Node = null!;

    @property({displayName: "文字数组", tooltip: "文字数组", type: [LabelComponent]})
    label: LabelComponent[] = [];

    @property({displayName: "遮挡的节点", tooltip: "遮挡的节点，目标节点的父节点", type: UITransformComponent})
    mask: UITransformComponent = null!;

    @property({displayName: "最小缩放倍数", tooltip: "最小缩放倍数", type: CCFloat})
    min_scale: number = 1.00;

    
    // 缩放灵敏度
    SPL: number = 0.5;

    // 上次缩放缩放时两个手指触点连线的长度
    length: number = null!;
    // 上次缩放的时候目标节点的位置，这个除以了缩放倍数，再次用这个值需要重新乘缩放倍数
    pos: Vec2 = null!;


    onLoad () {
        let self = this;

        // 给遮挡节点绑定移动事件   负责移动目标节点
        this.mask.node.on(SystemEventType.TOUCH_MOVE, function (event: EventTouch) {
            // 获取触点在上一次事件时的位置对象，对象包含 x 和 y 属性
            let last_pos = event.getPreviousLocation();
            // 获取触点位置
            let pos = event.getLocation();
            // 做向量减法
            let dir = last_pos.subtract(pos);
            // 获取目标节点坐标
            let node_pos = self.target.getPosition();
            // 设置目标节点坐标
            self.target.setPosition(new Vec3(node_pos.x - dir.x, node_pos.y - dir.y));

            console.log("移动了目标节点");
        }, this);

        // 给canvas绑定移动事件   负责两个手指缩放
        this.canvas.node.on(Node.EventType.TOUCH_MOVE, function (event: EventTouch) {

            // 获取触点
            let touches = event.getTouches();
            
            // 如果有两个以上触点
            if (touches.length >= 2) {
                // 获取第一个和第二个触点
                let touch1 = touches[0];
                let touch2 = touches[1];

                // 把通过触摸得到的点转到节点坐标，先用camera转为世界坐标再转到canvas节点空间坐标系
                let point1 = self.camera.screenToWorld(new Vec3(touch1.getLocation().x, touch1.getLocation().y));
                let point2 = self.camera.screenToWorld(new Vec3(touch2.getLocation().x, touch2.getLocation().y));
                let touchPoint1 = self.canvas.convertToNodeSpaceAR(point1);
                let touchPoint2 = self.canvas.convertToNodeSpaceAR(point2);
                // 最后转换成vec2
                let tp1 = new Vec2(touchPoint1.x, touchPoint1.y);
                let tp2 = new Vec2(touchPoint2.x, touchPoint2.y);
                // 两触点之差
                let tp_dis = tp1.subtract(tp2);
                // 两触点连线的长度
                let length = tp_dis.length();


                // 如果手指第一次触碰到屏幕
                if (self.length == null) {
                    // 设置两手指触点连线距离
                    self.length = length;
                    console.log("初始化");
                } else {

                    self.label[0].string = "两触点连线长度" + length;

                    // 算出灵敏度
                    let SPL = self.SPL * 1000;

                    // 放大了   本次两触点连线长度大于上次，也就是手指正在做放大动作
                    if (length > self.length) {
                        console.log("放大了");
                        
                        // 算出本次长度和上次长度差
                        let dis = length - self.length;
                        let scale = self.target.getScale();
                        self.target.setScale(scale.x + dis / SPL, scale.y + dis / SPL);
                    }
                    // 缩小了   本次两触点连线长度小于上次，也就是手指正在做缩小动作
                    else if (length < self.length) {
                        console.log("缩小了");

                        // 算出上次长度和本次长度差
                        let dis = self.length - length;
                        let scale = self.target.getScale();
                        self.target.setScale(scale.x - dis / SPL, scale.y - dis / SPL);
                    }
                }


                // 获取目标节点的缩放
                let scale = self.target.getScale();
                // 限制目标节点的缩放，目标节点缩到多小就不能缩了
                if (scale.x <= self.min_scale || scale.y <= self.min_scale) {
                    self.target.setScale(self.min_scale, self.min_scale, 1.0);
                }

                
                
                // 更新label
                self.label[1].string = "目标节点当前缩放：" + self.target.getScale();
                let sc_n = Math.floor(self.target.scale.x / 1.0 * 100) + "%";
                self.label[2].string = "当前缩放：" + sc_n;


                // 更新上次触摸时两触点连线长度
                self.length = length;


                // 获取目标节点缩放
                let sc = self.target.scale.x;
                
                // 如果第一次缩放
                if (self.pos == null!) {
                    // 设置上次目标节点位置   结果为目标节点的位置除以缩放倍数
                    self.pos = new Vec2(self.target.position.x / sc, self.target.position.y / sc);
                } else {
                    // 获取上次目标节点的位置并且乘缩放倍数
                    let pos = new Vec3(self.pos.x * sc, self.pos.y * sc);
                    // 设置目标节点的位置
                    self.target.setPosition(pos);

                    // 设置上次目标节点的位置   结果为目标节点的位置除以缩放倍数
                    self.pos = new Vec2(self.target.position.x / sc, self.target.position.y / sc);
                }
            }
        }, this.node);


        // 给canvas绑定结束触摸事件
        this.canvas.node.on(Node.EventType.TOUCH_END, function () {
            // 设置触点连线长为null，下次手指缩放时再次初始化，如果不写这句代码下一次手指缩放时会因为手指位置与上次距离过大而出现突然放大或缩小的问题
            self.length = null!;
            // 设置目标节点位置为null，下次手指缩放时再次初始化，如果不写这句代码会导致下一次手指缩放时图片位置锁定
            self.pos = null!;
        }, this);
    }

    update () {
        // 获取目标节点
        let target = this.target.getComponent(UITransformComponent)!;

        // 获取缩放倍数
        let sc = this.target.scale.x;

        // 获取目标节点和mask的上下左右
        let left_tg = target.node.position.x - (target.width * sc / 2);
        let right_tg = target.node.position.x + (target.width * sc / 2);
        let top_tg = target.node.position.y + (target.height * sc / 2);
        let up_tg = target.node.position.y - (target.height * sc / 2);

        let left = -this.mask.width / 2;
        let right = this.mask.width / 2;
        let top = this.mask.height / 2;
        let up = -this.mask.height / 2;


        // 获取目标节点位置，因为位置会发生变化，下面每个if语句后面都要再获取一次位置
        let pos = this.target.getPosition();
        

        // 检测目标节点不超出规定范围，防止出现黑边
        if (left_tg >= left) {
            this.target.setPosition(new Vec3(left + target.width * sc / 2, pos.y, pos.z));
            // console.log("左边缘");
        }

        pos = this.target.getPosition();

        if (right_tg <= right) {
            this.target.setPosition(new Vec3(right - target.width * sc / 2, pos.y, pos.z));
            // console.log("右边缘");
        }

        pos = this.target.getPosition();

        if (top_tg <= top) {
            this.target.setPosition(new Vec3(pos.x, top - target.height * sc / 2, pos.z));
            // console.log("上边缘");
        }

        pos = this.target.getPosition();

        if (up_tg >= up) {
            this.target.setPosition(new Vec3(pos.x, up + target.height * sc / 2, pos.z));
            // console.log("下边缘");
        }
    }

}