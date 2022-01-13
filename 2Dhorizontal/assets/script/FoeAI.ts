
import { _decorator, Component, Node, sp, CCFloat, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

// 状态
// 左走 右走 静止
export enum State{
    left, right, idle, attack,
};

@ccclass('Foe')
export class Foe extends Component {

    @property({displayName: "敌人", tooltip: "敌人，其实就是自己", type: sp.Skeleton})
    foe: sp.Skeleton = null;


    @property({displayName: "玩家节点", tooltip: "玩家节点", type: Node})
    player: Node = null;


    @property({displayName: "静止动画名称", tooltip: "静止动画名称"})
    idle_anim_name: string = "stand";

    @property({displayName: "行走动画名称", tooltip: "行走动画名称"})
    walk_anim_name: string = "celebrate";

    @property({displayName: "攻击动画名称", tooltip: "攻击动画名称"})
    attack_anim_name: string = "attack";


    @property({displayName: "行走速度", tooltip: "行走速度", type: CCFloat})
    walk_speed: number = 80;

    @property({displayName: "怪物走到哪里时停下攻击人物", tooltip: "怪物走到距离人物哪里时停下攻击人物", type: CCFloat})
    dis: number = 80;

    // 开始时状态是静止
    state = State.idle;

    update (dt: number) {
        // 如果状态为静止
        if (this.state == State.idle) {
            // 如果动画不为静止
            if (this.foe.animation != this.idle_anim_name) {
                // 动画为静止
                this.foe.animation = this.idle_anim_name;
            }
        }
        // 如果状态为左走 
        else if (this.state == State.left) {
            // 如果动画不为走路
            if (this.foe.animation != this.walk_anim_name) {
                // 动画为走路
                this.foe.animation = this.walk_anim_name;
            }

            // 移动
            let pos = this.foe.node.position;
            this.foe.node.setPosition(pos.x - this.walk_speed * dt, pos.y);
        }
        // 如果状态为右走 
        else if (this.state == State.right) {
            // 如果动画不为走路
            if (this.foe.animation != this.walk_anim_name) {
                // 动画为走路
                this.foe.animation = this.walk_anim_name;
            }

            // 移动
            let pos = this.foe.node.position;
            this.foe.node.setPosition(pos.x + this.walk_speed * dt, pos.y);
        }
        // 如果状态为攻击
        else if (this.state == State.attack) {
            // 如果动画不为攻击
            if (this.foe.animation != this.attack_anim_name) {
                // 动画为攻击
                this.foe.animation = this.attack_anim_name;
            }
        }

        if (this.foe.node.position.x > this.player.position.x) {
            // 人物缩放
            this.foe.node.setScale(new Vec3(-0.6, 0.6, 1));
        } else if (this.foe.node.position.x < this.player.position.x) {
            // 人物缩放
            this.foe.node.setScale(new Vec3(0.6, 0.6, 1));
        }

        // 怪物X减去主角X
        let dis = this.foe.node.position.x - this.player.position.x;
        // 如果在右侧
        if (dis > this.dis) {
            // 状态为左走
            this.state = State.left;
        }
        // 如果在左侧 
        else if (dis < -this.dis) {
            // 状态为右走
            this.state = State.right;
        } 
        // 如果上面两种都不是
        else {
            // 状态为攻击
            this.state = State.attack;
        }


    }

}