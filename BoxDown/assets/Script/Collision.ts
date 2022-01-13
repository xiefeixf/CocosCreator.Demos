const {ccclass, property} = cc._decorator;

@ccclass
export default class WuLi extends cc.Component {

    onLoad(){
        let manager = cc.director.getCollisionManager();//获取碰撞引擎
        manager.enabled = true;//开启碰撞引擎
    }

}