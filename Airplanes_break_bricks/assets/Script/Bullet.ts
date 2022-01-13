const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    // 子弹速度
    speed: number = 100;

    // 子弹
    ATK: number = 2;

    onLoad (): void {
        // 获取GameController脚本
        let gc = cc.find("Canvas").getComponent("GameController");
        // 获取速度和攻击力并赋值
        let speed: number = gc.bullet_speed;
        let ATK: number = gc.ATK;
        this.speed = speed;
        this.ATK = ATK;
    }
    
    update (dt: number) {
        // 获取GameController脚本
        let gc = cc.find("Canvas").getComponent("GameController");

        // 自身移动
        if (gc.is_plane_move == true) {
            this.node.y += dt * this.speed;
        }

        // 获取canvas节点
        let canvas = cc.find("Canvas");
        // 如果自身到了屏幕最上方
        if (this.node.y >= (canvas.height / 2) + (this.node.height / 2)) {
            this.node.destroy();
            // cc.log("子弹超出了屏幕，自动销毁");
        }
    }

}
