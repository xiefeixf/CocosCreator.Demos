
import { _decorator, Component, Node, sp, CCFloat, LabelComponent, SpriteComponent, log, Vec3, tween, AnimationComponent, SystemEventType } from 'cc';
const { ccclass, property } = _decorator;

// 状态
// 左走 右走 静止
export enum State{
    left, right, idle,
};

@ccclass('Player')
export default class Player extends Component {

    @property(Node)
    canvas: Node = null;


    @property({displayName: "角色", tooltip: "角色", type: sp.Skeleton})
    player: sp.Skeleton = null!;


    @property({displayName: "行走速度", tooltip: "行走速度", type: CCFloat})
    walk_speed: number = 200;


    @property({displayName: "左走按钮", tooltip: "左走按钮", type: Node})
    left_walk_btn: Node = null!;

    @property({displayName: "右走按钮", tooltip: "右走按钮", type: Node})
    right_walk_btn: Node = null!;


    @property({displayName: "静止动画名称", tooltip: "静止动画名称"})
    idle_anim_name: string = "idle";

    @property({displayName: "行走动画名称", tooltip: "行走动画名称"})
    walk_anim_name: string = "walk";


    state = State.idle;// 状态，默认为静止

    
    onLoad () {
        // 给左走按钮绑定事件
        this.left_walk_btn.on(SystemEventType.TOUCH_START, this.left_walk, this);
        this.left_walk_btn.on(SystemEventType.TOUCH_END, this.idle_walk, this);
        this.left_walk_btn.on(SystemEventType.TOUCH_CANCEL, this.idle_walk, this);
 
        // 给右走按钮绑定事件
        this.right_walk_btn.on(SystemEventType.TOUCH_START, this.right_walk, this);
        this.right_walk_btn.on(SystemEventType.TOUCH_END, this.idle_walk, this);
        this.right_walk_btn.on(SystemEventType.TOUCH_CANCEL, this.idle_walk, this);
    }


    update (dt: number) {
        // 如果状态为静止
        if (this.state == State.idle) {
            // 如果动画不为静止
            if (this.player.animation != this.idle_anim_name) {
                // 动画为静止
                this.player.animation = this.idle_anim_name;
            }
        }
        // 如果状态为左走 
        else if (this.state == State.left) {
            // 如果动画不为走路
            if (this.player.animation != this.walk_anim_name) {
                // 动画为走路
                this.player.animation = this.walk_anim_name;
            }

            // 移动
            let pos = this.player.node.position;
            this.player.node.setPosition(pos.x - this.walk_speed * dt, pos.y);
            // 人物缩放
            this.player.node.setScale(new Vec3(-0.6, 0.6, 1));
        }
        // 如果状态为右走 
        else if (this.state == State.right) {
            // 如果动画不为走路
            if (this.player.animation != this.walk_anim_name) {
                // 动画为走路
                this.player.animation = this.walk_anim_name;
            }

            // 移动
            let pos = this.player.node.position;
            this.player.node.setPosition(pos.x + this.walk_speed * dt, pos.y);
            // 人物缩放
            this.player.node.setScale(new Vec3(0.6, 0.6, 1));
        }


    }


    // 左走专用函数
    left_walk () {
        log("左走");
        this.state = State.left;
    }

    // 右走专用函数
    right_walk () {
        log("右走");
        this.state = State.right;
    }

    // 静止专用函数
    idle_walk () {
        this.state = State.idle;
    }



}