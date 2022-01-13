const {ccclass, property} = cc._decorator;

@ccclass
export default class WuLi extends cc.Component {

    onLoad(){
        let manager=cc.director.getPhysicsManager();//声明变量
        manager.enabled=true;//开启物理引擎
        manager.gravity=cc.v2(0,-1000);//下落速度
    }
    
}
