
import { _decorator, Component, Node, GraphicsComponent, Color, CameraComponent, Vec2, Vec3, UITransform, UITransformComponent, EventTouch, SystemEventType, Camera, Canvas, sys, editorExtrasTag, path, color, SpriteComponent } from 'cc';
const { ccclass, property } = _decorator;

// 笔刷类型 是画笔还是橡皮
export enum Type {
    brush, 
    eraser,
}


@ccclass('Main')
export default class Main extends Component {

    @property(Node)
    canvas: Node = null!;

    @property({displayName: "黑板背景", tooltip: "黑板背景", type: Node})
    bg: Node = null!;


    @property({displayName: "相机", tooltip: "拍UI的相机", type: CameraComponent})
    camera: CameraComponent = null!;


    @property({displayName: "笔刷", tooltip: "笔刷节点", type: GraphicsComponent})
    brush: GraphicsComponent = null!;

    // 类型 默认是画笔
    type = Type.brush;

    // 画笔的颜色和线宽
    brush_color: Color = Color.WHITE;
    brush_width: number = 5;

    // 橡皮的颜色和大小
    eraser_color: Color = null!;
    eraser_width: number = 20;


    onLoad () {
        let self = this;

        // 给canvas绑定开始触摸事件
        this.canvas.on(SystemEventType.TOUCH_START, function (event: EventTouch) {
            let point = self.PointToNode(event.getLocation(), self.camera, self.canvas);
            let x = point.x;
            let y = point.y;

            // 设置路径起点
            self.brush.moveTo(x, y);

        }, this);

        // 给canvas绑定触摸移动事件
        this.canvas.on(SystemEventType.TOUCH_MOVE, function (event: EventTouch) {
            let point = self.PointToNode(event.getLocation(), self.camera, self.canvas);
            let x = point.x;
            let y = point.y;

            // 设置直线路径
            self.brush.lineTo(x, y);
            // 绘制所有路径
            self.brush.stroke();

        }, this);

        // 设置橡皮颜色为黑板背景的颜色
        this.eraser_color = this.bg.getComponent(SpriteComponent)!.color;

    }


    update () {
        // 如果是画笔
        if (this.type == Type.brush) {
            // 设置颜色和线宽
            this.brush.strokeColor = this.brush_color;
            this.brush.lineWidth = this.brush_width;
        }
        // 如果是橡皮 
        else if (this.type == Type.eraser) {
            // 设置颜色和大小
            this.brush.strokeColor = this.eraser_color;
            this.brush.lineWidth = this.eraser_width;
        }
    }


    // 通过触摸得到的点转为节点坐标下
    PointToNode (point: Vec2, camera: CameraComponent, node: Node): Vec2 {
        let point_world = camera.screenToWorld(new Vec3(point.x, point.y));
        let point_result = node.getComponent(UITransformComponent)!.convertToNodeSpaceAR(point_world);
        return(new Vec2(point_result.x, point_result.y));
    }


}