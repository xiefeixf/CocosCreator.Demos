
// 导入Joystick脚本
import joy from "./Joystick"

import { _decorator, Component, Node, CCLoader, CCFloat, Vec2, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {


    @property({displayName: "摇杆脚本所在节点", tooltip: "摇杆脚本Joystick所在脚本", type: joy})
    joy: joy = null!;


    @property({displayName: "角色", tooltip: "角色", type: Node})
    player: Node = null!;


    @property({displayName: "是否根据方向旋转角色", tooltip: "角色是否根据摇杆的方向旋转"})
    is_angle: boolean = true;


    @property({displayName: "是否禁锢角色", tooltip: "是否禁锢角色，如果角色被禁锢，角色就动不了了"})
    is_fbd_player: boolean = false;


    @property({displayName: "角色移动速度", tooltip: "角色移动速度，不建议太大，1-10最好", type: CCFloat})
    speed: number = 3;


    // 角色的移动向量
    vector: Vec2 = new Vec2(0, 0);

    // 角色旋转的角度
    angle: number = 0;


    update () {
        // console.log("vector", this.vector.toString(), "angle", this.angle);
        

        // 如果没有禁锢角色
        if (this.is_fbd_player == false) {
            // 获取角色移动向量
            this.vector = this.joy.vector;

            // 向量归一化
            let dir = this.vector.normalize();

            // 乘速度
            let dir_x = dir.x * this.speed;
            let dir_y = dir.y * this.speed;

            // 角色坐标加上方向
            let x = this.player.position.x + dir_x;
            let y = this.player.position.y + dir_y;

            // 设置角色坐标
            this.player.setPosition(x, y);
        }

        // 如果根据方向旋转角色
        if (this.is_angle == true) {
            // 获取角色旋转的角度
            this.angle = this.joy.angle;
            // 对角色进行旋转
            this.player.angle = this.angle;
        }
        
    }


}