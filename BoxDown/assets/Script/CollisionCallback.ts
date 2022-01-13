const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onCollisionEnter(other,self){//当碰撞产生的时候调用//other 产生碰撞的另一个碰撞组件self  产生碰撞的自身的碰撞组件
        console.log('onCollisionEnter')
        if(other.node.name == "box"){//如果碰撞的节点是box游戏就结束
            this.GameOver();
        }
    }

    GameOver(){
        console.log("游戏结束了");
        cc.director.loadScene("Finish");//游戏结束场景跳转
    }

}
