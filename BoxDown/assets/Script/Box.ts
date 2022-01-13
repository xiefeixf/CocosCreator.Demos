const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.RigidBody)
    self:cc.RigidBody = null;//自身刚体

    @property(cc.PhysicsBoxCollider)
    self_box:cc.PhysicsBoxCollider = null;//自身物理碰撞

    @property(cc.BoxCollider)
    self_collision:cc.BoxCollider = null;//自身碰撞

    @property(cc.Node)
    me:cc.Node = null;//自身

    @property(cc.Animation)
    move:cc.Animation = null;//箱子移动时的动画

    isdown:boolean = false;//是否在向下降

    onLoad(){
        this.self.type = cc.RigidBodyType.Static;//开始时刚体是静止的
        this.move.play("move");//播放移动动画
        cc.find
    }

    update(){
        if(this.isdown == true){//如果箱子正在下降
            this.self.type = cc.RigidBodyType.Dynamic;//刚体变成动态的
        }
    }

}
