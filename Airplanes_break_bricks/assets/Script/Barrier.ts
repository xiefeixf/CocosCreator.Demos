const {ccclass, property} = cc._decorator;

@ccclass
export default class Barrier extends cc.Component {

    @property({type: cc.Label, displayName: "显示数值的文字", tooltip: "显示数值的文字"})
    num_lb: cc.Label = null;

    // @property({type: cc.Float, displayName: "自身数值", tooltip: "自身数值，当数值为0时当前节点销毁"})
    num: number = 20;

    // 自身速度
    speed: number = 2;

    onLoad (): void {
        // 自身和文字随机颜色
        this.node.color = cc.color(this.random_color().x, this.random_color().y, this.random_color().z, 255);
        this.num_lb.node.color = cc.color(this.random_color().x, this.random_color().y, this.random_color().z, 255);

        // 防止颜色一样
        // 如果自身和文字颜色一样
        if (this.num_lb.node.color == this.node.color) {
            // 文字如果不为红色
            if (this.num_lb.node.color != cc.color(255, 0, 0, 255)) {
                // 文字变成红色
                this.num_lb.node.color = cc.color(255, 0, 0, 255);
            } else {// 如果不
                // 文字变为黑色
                this.num_lb.node.color = cc.color(0, 0, 0, 255);
            }
        }

        // 获取GameController脚本
        let gc = cc.find("Canvas").getComponent("GameController");
        // 获取脚本下障碍物的生命值并加上随机数
        let h = (gc.barrier_health) + Math.floor(Math.random() * 10);
        // 获取脚本下障碍物的速度
        let s = gc.barrier_speed;

        // 赋值
        this.num = h;
        this.speed = s;
    }

    // 随机颜色函数
    random_color (): cc.Vec3 {
        let r = this.randomNumber(0, 255);
        let g = this.randomNumber(0, 255);
        let b = this.randomNumber(0, 255);
        return(cc.v3(r, g, b));
    }

    update (dt: number) {
        // 将自身生命值取整
        let num = Math.floor(this.num);
        //在label上显示
        this.num_lb.string = num.toString();
        

        // 获取GameController脚本
        let gc = cc.find("Canvas").getComponent("GameController");

        // 自身移动
        if (gc.is_barrier_move == true) {
            this.node.y -= dt * this.speed;
        }

        // 获取canvas节点
        let canvas = cc.find("Canvas");
        // 如果自身到了屏幕最下方
        if (this.node.y <= -(canvas.height / 2)) {
            // 获取GameController脚本
            let gc = cc.find("Canvas").getComponent("GameController");
            // 调用游戏结束函数
            gc.gameover();
        }
    }

    // 碰撞回调
    onCollisionEnter(other, self){// 当碰撞产生的时候调用 other 产生碰撞的另一个碰撞组件  self 产生碰撞的自身的碰撞组件

        if (other.node.group == "bullet") {
            // cc.log("发生了碰撞");

            // 获取GameController脚本
            let gc = cc.find("Canvas").getComponent("GameController");
            // 获取Bullet脚本
            let c = other.getComponent("Bullet");

            // 从脚本获取攻击力减少自身生命值
            this.reduce_num(c.ATK);
            // 如果可以加双倍分数
            if (gc.is_double == true) {
                // 加分
                gc.add_score((c.ATK) * 2);
            }
            // 如果不可以加双倍分数 
            else if (gc.is_double == false) {
                // 加分
                gc.add_score(c.ATK);
            }
                // 销毁子弹
                other.node.destroy();
        }

        
        if (other.node.group == "invincible") {

            // cc.log("发生了碰撞 无敌");

            // 获取GameController脚本
            let gc = cc.find("Canvas").getComponent("GameController");

            // 如果可以加双倍分数
            if (gc.is_double == true) {
                // 加双倍分
                gc.add_score(this.num * 2);
            }

            // 如果不可以加双倍分数 
            else if (gc.is_double == false) {
                // 加单倍分
                gc.add_score(this.num);
            }

            // 自身销毁
            this.node.destroy();
        
        }

        // 播放碰撞音效
        let music = cc.find("Canvas").getComponent("Music");
        music.play_music_collision();

        /* if (other.node.group == "barrier") {
            cc.log("出现障碍物重叠错误");
            cc.log("分组名称" + other.node.group);
            other.node.destroy();
        } */

        // 如果生命值小于等于0
        if (this.num <= 0) {
            // 自身销毁
            this.node.destroy();
        }

    }

    // 减少自身生命值函数
    reduce_num (num: number) {
        this.num -= num;
    }

    // 随机数函数 min为最小值 max为最大值 将返回一个number，值大小的范围为min-max
    randomNumber (min: number, max: number): number {
        return(Math.round(Math.random() * (min - max) + max));
    }
    
}
