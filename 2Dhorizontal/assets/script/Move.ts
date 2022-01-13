
import { _decorator, Component, Node, UITransformComponent, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Move')
export class Move extends Component {

    @property({displayName: "相机", tooltip: "相机", type: Node})
    camera: Node = null;

    @property({type: UITransformComponent})
    canvas: UITransformComponent = null;
 
    @property({displayName: "背景", tooltip: "背景", type: Node})
    bg: Node = null;
 
    @property({displayName: "角色", tooltip: "角色", type: Node})
    player: Node = null;
 
    update () {
        // 左边四分之三屏幕位置
        let left_3_4 = this.camera.position.x - (this.canvas.width / 4);
        // 右边四分之三屏幕位置
        let right_3_4 = this.camera.position.x + (this.canvas.width / 4);
 
        // 如果到了右边四分之三屏幕位置
        if (this.player.position.x >= right_3_4) {
            // log("到了右边四分之三处");
            // 相机跟随角色移动
            this.camera.setPosition(new Vec3(this.player.position.x - (this.canvas.width / 4), 0, 1000));
        }
        // 如果到了左边四分之三屏幕位置
        if (this.player.position.x <= left_3_4) {
            // log("到了左边四分之三处");
            // 相机跟随角色移动
            this.camera.setPosition(new Vec3(this.player.position.x + (this.canvas.width / 4), 0, 1000))
        }
 
 
 
        // 背景左
        let left_bg = this.bg.position.x - (this.bg.getComponent(UITransformComponent).width / 2);
        // 背景右
        let right_bg = this.bg.position.x + (this.bg.getComponent(UITransformComponent).width / 2);
 
        // 相机左
        let left_cam = this.camera.position.x - (this.canvas.width / 2);
        // 相机右
        let right_cam = this.camera.position.x + (this.canvas.width / 2);
 
        // 如果相机到达左边缘
        if (left_cam <= left_bg) {
            // 一直在边缘
            this.camera.setPosition(new Vec3(left_bg + (this.canvas.width / 2), 0, 1000))
            // log("左边到达边缘");
        }
 
        // 如果相机到达右边缘
        if (right_cam >= right_bg) {
            // 一直在边缘
            this.camera.setPosition(new Vec3(right_bg - (this.canvas.width / 2), 0, 1000))
            // log("右边到达边缘");
        }
    }
}