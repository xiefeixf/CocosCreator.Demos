const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    box:cc.Prefab = null;//预制体 箱子

    @property(cc.Node)
    xiangji:cc.Node = null;//相机

    @property(cc.Node)
    boxParent:cc.Node = null;//箱子的父节点

    @property(cc.Node)
    box_self:cc.Node = null;//最开始的箱子自身

    @property(cc.Label)
    score_lb:cc.Label = null;//分数

    @property(cc.Node)
    lb_score:cc.Node = null;//分数

    isok:boolean = true;//是否可以生成新的箱子

    score:number = 0;//分数

    onLoad(){
        this.xiangji.on(cc.Node.EventType.TOUCH_START,this.down,this);//给相机在触摸的时候添加点击事件
        this.xiangji.width = this.node.width;//相机的宽和高和屏幕的宽和高一样
        this.xiangji.height = this.node.height;
    }

    update(dt:number){
        this.score_lb.string = "分数:" + this.score.toString();//每秒获取最新分数
        this.lb_score.y = this.xiangji.y+(this.xiangji.height/2)-this.lb_score.height-10;//介绍和分数的最佳位置
        //this.jieshao.y = this.xiangji.y-(this.xiangji.height/2)+this.jieshao.height+10;
    }

    down(){//箱子下降
        if(this.isok == true){
            let box = this.boxParent.children[this.boxParent.childrenCount-1].getComponent("Box");//获取box组件
            box.isdown = true;//箱子开始下降
            box.move.stop("move");//停止播放移动动画
            console.log("点击了相机");
            this.scheduleOnce(function() {
                this.shengcheng();
            },0.5);//为了防止箱子堆到一块，在0.5秒后生成新的箱子
            this.score += Math.floor(Math.random()*3);//随机加分数
            this.isok = false;
            this.scheduleOnce(function() {
                this.isok = true;
            },0.5);//0.5秒后才可以继续生成新箱子
        }
    }

    shengcheng(){//生成新箱子
        let node = cc.instantiate(this.box)//你要复制的节点名称
        node.parent = this.boxParent;//复制节点的父节点是什么
        node.setPosition(cc.v2(0,(this.xiangji.y+this.xiangji.height/2)-this.box_self.height-50));//复制的节点的位置

        let pos : cc.Vec2[] = [];
        pos.push(cc.v2(this.xiangji.position));
        pos.push(cc.v2(0,this.xiangji.y+this.box_self.height));

        this.xiangji.runAction(cc.sequence(//相机的移动
            cc.cardinalSplineTo(0.8,pos,0.5),
            cc.callFunc(function(){
               //执行动画时的函数
            })
        ));
       
        console.log("生成了新的箱子");
    }

}
