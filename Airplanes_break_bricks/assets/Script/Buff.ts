const {ccclass, property} = cc._decorator;

@ccclass
export default class Buff extends cc.Component {

    // 自身移动速度
    speed: number = 2;

    onLoad () {
        // 获取GameController脚本
        let gc = cc.find("Canvas").getComponent("GameController");
        // 获取障碍物移动速度
        let s = gc.barrier_speed;
        // 赋值
        this.speed = s;
    }

    update (dt: number) {
        // 获取GameController脚本
        let gc = cc.find("Canvas").getComponent("GameController");

        // 自身移动
        if (gc.is_barrier_move == true) {
            this.node.y -= dt * this.speed;
        }
    }

    // 碰撞回调
    onCollisionEnter(other, self){// 当碰撞产生的时候调用  other 产生碰撞的另一个碰撞组件   self 产生碰撞的自身的碰撞组件
        // 获取GameController脚本
        let gc = cc.find("Canvas").getComponent("GameController");


        // 如果子弹射速满了就不增加射速了
        if (gc.bullet_speed < 10000) {
            // 随机数 0 - 10
            let n = this.randomNumber(0, 10);
            // 有一半的几率执行子弹加速函数
            // 也有一半的几率执行子弹加攻击力函数
            if (n > 5) {
                gc.enhance_speed();// 加速buff
            } // else if (n < 5) 
            else {
                gc.enhance_ATK();// 加攻击力buff
            }
        } else {
            gc.enhance_ATK();// 加攻击力buff
        }

        
        // cc.log("吃了buff");
        // 自身销毁
        this.node.destroy();

        // 播放音效
        let music = cc.find("Canvas").getComponent("Music");
        music.play_music_buff();

    }

    // 随机数函数 min为最小值 max为最大值 将返回一个number，值大小的范围为min-max
    randomNumber (min: number, max: number): number {
        return(Math.round(Math.random() * (min - max) + max));
    }

}
