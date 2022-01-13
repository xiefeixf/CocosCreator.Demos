const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    string_lable:cc.Label = null;//当前点击次数的文字

    @property(cc.Node)
    btn:cc.Node = null;//屏幕中间的按钮，负责加点击次数的

    @property(cc.Label)
    time_lable:cc.Label = null;//剩余时间

    @property(cc.Label)
    atlast_lable:cc.Label = null;//显示最终点击了多少次屏幕的文字

    @property(cc.Label)
    lishi:cc.Label = null;//历史最高分

    @property
    time:number = 10;//开始时候的时间

    cishu:number = 0;//点击的次数

    history_s:number = 0;//历史点击最高次数

    start(){
        this.atlast_lable.node.active = false;//在开始的时候把最终点击了多少下的文字隐藏
        if(cc.sys.localStorage.getItem(this.history_s) == null){//如果历史记录为null就初始化历史记录
            cc.sys.localStorage.setItem(this.history_s,0);//初始化
        }
    }

    onLoad(){
        this.btn.on(cc.Node.EventType.TOUCH_START,this.onbtn,this);//给按钮绑定事件
    }

    update(dt:number){
        this.string_lable.string = "当前点击次数:" + this.cishu.toString();//每帧更新当前点击的次数
        this.time_lable.string = "当前剩余时间:" + Math.floor(this.time).toString();//每帧更新当前剩余的时间
        if(this.time > 0){//如果当前剩余时间大于0那么不断减小
            this.time -= dt;//当前剩余时间每秒-1
        }
        if(this.time < 0){//当剩余时间小于0游戏结束
            this.gameover();//游戏结束
        }
        this.atlast_lable.string = "最终分数:"+this.cishu.toString();//每帧更新最终分数
        this.lishi.string = "历史最高分:" + cc.sys.localStorage.getItem(this.history_s);//每帧更新历史最高分
    }

    onbtn(){
        this.cishu = this.cishu + 1;//点击次数+1
        console.log("按下了按钮")//打印log
    }

    gameover(){
        this.btn.active = false;//当游戏结束时按钮隐藏
        this.time_lable.node.active = false;//当游戏结束时当前时间隐藏
        this.string_lable.node.active = false;//当游戏结束时当前点击次数隐藏
        this.atlast_lable.node.active = true;//当游戏结束时让最终统计的文字显示
        let num = cc.sys.localStorage.getItem(this.history_s);//获取一下当前的历史最高分
        if(this.cishu > num){//如果分数超过了历史最高分
            cc.sys.localStorage.setItem(this.history_s,this.cishu);//那么就重新设置历史最高分
        }
    }

    fanhui_function(){
        cc.director.loadScene("Start");//返回开始场景
    }

}