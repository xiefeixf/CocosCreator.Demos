
import { _decorator, Component, Node, Prefab, UITransformComponent, SystemEventType, Vec2, CameraComponent, Vec3, EventTouch, instantiate, tween, ParticleSystem2D, Color } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Typescript')
export class Typescript extends Component {

    @property(UITransformComponent)
    canvas: UITransformComponent = null!;

    @property({displayName: "相机", tooltip: "canvas下的相机", type: CameraComponent})
    camera: CameraComponent = null!;

    @property({displayName: "粒子预制体", tooltip: "粒子预制体", type: Prefab})
    particle_pre: Prefab = null!;

    // 实例化出的新粒子节点
    particle: Node = null!;

    onLoad () {
        let self = this;

        // 给canvas绑定开始触摸事件
        this.canvas.node.on(SystemEventType.TOUCH_START, function (event: EventTouch) {
            // 获取触点并且转换到canvas节点空间坐标系
            let pos = self.touchPointToNode(event.getLocation(), self.camera, self.canvas);

            // 实例化粒子
            let node = instantiate(self.particle_pre);
            node.parent = self.canvas.node;
            node.position = pos;

            self.particle = node;
        }, this);

        // 给canvas绑定触摸移动事件
        this.canvas.node.on(SystemEventType.TOUCH_MOVE, function (event: EventTouch) {
            // 获取触点转到canvas节点空间坐标系
            let pos = self.touchPointToNode(event.getLocation(), self.camera, self.canvas);
            // 设置粒子坐标
            self.particle.position = pos;
        }, this);

        // 给canvas绑定触摸结束事件
        this.canvas.node.on(SystemEventType.TOUCH_END, function () {
            let node = self.particle;
            let particle = node.getComponent(ParticleSystem2D)!;
            // 缓动，0.3秒将每秒粒子发射数目设为0并且销毁
            tween(particle)
                .to(0.3, { emissionRate: 0 })
                .delay(0.3)
                .call(function () {
                    node.destroy();
                    console.log("销毁了");
                })
                .union()
                .start();
        }, this);

        // 给canvas绑定触摸取消事件
        this.canvas.node.on(SystemEventType.TOUCH_CANCEL, function () {
            let node = self.particle;
            let particle = node.getComponent(ParticleSystem2D)!;
            // 缓动，0.3秒将每秒粒子发射数目设为0并且销毁
            tween(particle)
                .to(0.3, { emissionRate: 0 })
                .delay(0.3)
                .call(function () {
                    node.destroy();
                    console.log("销毁了");
                })
                .union()
                .start();
        }, this);
    }


    // 把通过触摸得到的点转到节点空间坐标系，这个坐标系以锚点为原点
    /* 
    point 是通过触摸得到的点
    camera 是canvas下的相机
    node 是目标节点
    */
    touchPointToNode (point: Vec2, camera: CameraComponent, node: UITransformComponent): Vec3 {
        let world_point = camera.screenToWorld(new Vec3(point.x, point.y));
        let result_point = node.convertToNodeSpaceAR(world_point);
        return(result_point);
    }
    
}