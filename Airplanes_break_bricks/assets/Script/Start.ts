const {ccclass, property} = cc._decorator;

@ccclass
export default class Start extends cc.Component {

    @property(cc.Node)
    canvas: cc.Node = null;


    @property({type: cc.Node, displayName: "粒子", tooltip: "粒子节点"})
    particle: cc.Node = null;

    @property({type: cc.Node, displayName: "开始游戏按钮", tooltip: "开始游戏按钮"})
    btn: cc.Node = null;


    @property({type: cc.Label, displayName: "显示历史最高分的文字", tooltip: "显示历史最高分的文字"})
    score_lb: cc.Label = null;


    @property({type: cc.AudioSource, displayName: "点击按钮音效", tooltip: "点击按钮音效"})
    music: cc.AudioSource = null;

    onLoad () {
        let self = this;

        // 恢复游戏，避免游戏暂停导致无法继续
        cc.director.resume();
        // 加载游戏场景
        cc.director.preloadScene("Game");
        // 给canvas绑定事件
        this.canvas.on(cc.Node.EventType.TOUCH_MOVE,this.onmove,this);
        this.canvas.on(cc.Node.EventType.TOUCH_END,this.end,this);

        // 如果历史最高分为null  初始化分数
        let score = cc.sys.localStorage.getItem("score");
        if (score == null) {
            cc.sys.localStorage.setItem("score", 0);
            cc.log("初始化分数");
        }

        // 更新历史最高分
        this.score_lb.string = "历史最高分：" + Math.floor(score);

        // 给开始游戏按钮绑定事件
        this.btn.on(cc.Node.EventType.TOUCH_START, function () {
            // 播放音乐
            self.music.play();
        }, this);
    }

    // 点击开始游戏按钮时执行的函数
    onbtn () {
        // 打印log
        cc.log("点击了按钮");
        // 跳转场景
        cc.director.loadScene("Game");
    }

    // 当手指在屏幕移动时执行的函数
    onmove (event: cc.Event.EventTouch) {
        // 显示粒子特效
        this.particle.active = true;
        // 打印log
        console.log('手指在屏幕上移动了');


        // 触摸点的坐标
        var pos = new cc.Vec2(event.getLocationX(), event.getLocationY());
        // 转换坐标
        pos = this.canvas.convertToNodeSpaceAR(pos);// 将一个点转换到节点 (局部) 空间坐标系，这个坐标系以锚点为原点
        // 给粒子特效赋值
        this.particle.position = cc.v3(pos);
    }

    // 当手指离开屏幕时执行的函数
    end () {
        // 隐藏粒子特效
        this.particle.active = false;
    }

}
