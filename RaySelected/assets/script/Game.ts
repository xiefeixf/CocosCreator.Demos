
import { _decorator, Component, Node, CameraComponent, systemEvent, SystemEventType, EventTouch, Touch, PhysicsSystem, geometry, PhysicsRayResult, LabelComponent, MeshRenderer, math, Material } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {

    @property({displayName: "3D相机", type: CameraComponent})
    camera: CameraComponent = null!;

    @property({displayName: "文字", tooltip: "文字", type: LabelComponent})
    label: LabelComponent = null!;

    @property({displayName: "描边材质", tooltip: "描边材质", type: Material})
    outline: Material = null!;

    @property({displayName: "默认材质", tooltip: "默认材质", type: Material})
    default: Material = null!;

    // 上一个选中的结果
    last: MeshRenderer = null!;

    onLoad () {
        this.label.string = "请点击屏幕";

        systemEvent.on(SystemEventType.TOUCH_START, (e: Touch) => {
            // 获取触摸点并且创建射线
            let pos = e.getLocation();
            let ray = this.camera.screenPointToRay(pos.x, pos.y);
            // 传入射线
            this.get_result(ray);
        }, this);
    }

    get_result (ray: geometry.Ray) {
        // 如果选中了节点
        if (PhysicsSystem.instance.raycastClosest(ray) == true) {
            // 获取射线最短的检测结果
            var node = PhysicsSystem.instance.raycastClosestResult;
            // 获取名字
            let name = node.collider.name;

            // 根据不同的名字进行不同的判断
            if (name == "Cylinder<CylinderCollider>") {
                this.label.string = "点击到了物体：圆柱";
            } else if (name == "Cube<BoxCollider>") {
                this.label.string = "点击到了物体：立方体";
            } else if (name == "Capsule<CapsuleCollider>") {
                this.label.string = "点击到了物体：胶囊";
            } else if (name == "Cone<ConeCollider>") {
                this.label.string = "点击到了物体：圆锥";
            } else if (name == "Sphere<SphereCollider>") {
                this.label.string = "点击到了物体：球";
            } else if (name == "Torus<MeshCollider>") {
                this.label.string = "点击到了物体：圆环";
            } else {
                this.label.string = "点击到了物体：" + node.collider.name;
            }

            // 设置检测结果的材质为红色描边
            node.collider.node.getComponent(MeshRenderer)!.material = this.outline;
            // 如果不是第一次选中并本次选中和上次不同
            if (this.last != null && node.collider.node.getComponent(MeshRenderer) != this.last) {
                // 设置为默认材质
                this.last.material = this.default;
            }
            // 设置上次选中的结果
            this.last = node.collider.node.getComponent(MeshRenderer)!;
        } else {
            // 没选中任何物体设置上次选中结果材质为默认
            this.label.string = "没点到任何物体";
            if (this.last != null) {
                this.last.material = this.default;
            }
        }
    }

}