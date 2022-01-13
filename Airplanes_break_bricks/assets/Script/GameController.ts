const {ccclass, property} = cc._decorator;

@ccclass
export default class GameController extends cc.Component {

    @property(cc.Node)
    canvas: cc.Node = null;

    @property({type: cc.Node, displayName: "显示获得buff类型的label", tooltip: "显示获得buff类型的label"})
    label_parent: cc.Node = null;

    @property({type: cc.Node, displayName: "显示双倍分数的label", tooltip: "显示双倍分数的label"})
    double_lb: cc.Node = null;

    @property({type: cc.Node, displayName: "游戏结束时显示的节点", tooltip: "游戏结束时显示的节点"})
    gameover_UI: cc.Node = null;

    @property({type: cc.Node, displayName: "飞机（主角）", tooltip: "主角，也就是飞机节点"})
    plane: cc.Node = null;

    @property({type: cc.Node, displayName: "所有障碍物父节点", tooltip: "所有障碍物父节点，这个节点用来消除所有障碍物"})
    barrier_parent: cc.Node = null;

    @property({type: cc.Node, displayName: "复活按钮", tooltip: "复活按钮，点击一次复活按钮后将隐藏"})
    btn_resurgence: cc.Node = null;

    @property({type: cc.Node, displayName: "特殊按钮节点", tooltip: "特殊按钮节点，分别为全消无敌和菜单"})
    special_btn: cc.Node = null;



    @property({type: cc.Label, displayName: "显示分数文字", tooltip: "显示分数的文字"})
    score_lb: cc.Label = null;


    @property({type: cc.Label, displayName: "显示状态的文字", tooltip: "显示状态的文字，显示射速，攻击力，两个label前后位置无所谓"})
    state_lb: cc.Label[] = [];




    @property({type: cc.Prefab, displayName: "炮弹预制体", tooltip: "炮弹的预制体，飞机每时每刻都在发射炮弹"})
    bullet: cc.Prefab = null;

    @property({type: cc.Prefab, displayName: "障碍物预制体", tooltip: "障碍物的预制体"})
    barrier: cc.Prefab = null;

    @property({type: cc.Prefab, displayName: "buff球预制体", tooltip: "buff球预制体"})
    buff: cc.Prefab = null;

    @property({type: cc.Prefab, displayName: "显示无敌剩余时间的文字", tooltip: "显示无敌剩余时间的文字"})
    invincible_lb_pre: cc.Prefab = null;




    @property({displayName: "炮弹生成左侧坐标", tooltip: "炮弹生成左侧坐标，以飞机锚点为原点建立坐标系时炮弹的位置"})
    bullet_left_pos: cc.Vec2 = null;

    @property({displayName: "炮弹生成右侧坐标", tooltip: "炮弹生成右侧坐标，以飞机锚点为原点建立坐标系时炮弹的位置"})
    bullet_right_pos: cc.Vec2 = null;




    @property({displayName: "每个障碍物间距范围", tooltip: "每个障碍物间距范围，最小多少，最大多少"})
    barrier_spacing: cc.Vec2 = cc.v2(10, 50);
    

    @property({type: cc.Float, displayName: "无敌持续时间", tooltip: "无敌持续时间，当按下无敌按钮时多久后恢复"})
    invincible_time: number = 8;

    @property({type: cc.Float, displayName: "障碍物宽度（必填）", tooltip: "障碍物宽度（必填），代码将根据这个值来计算出障碍物生成的最佳位置"})
    barrier_width: number = 100;

    @property({type: cc.Float, displayName: "障碍物高度（必填）", tooltip: "障碍物高度（必填），代码将根据这个值来计算出障碍物生成的最佳位置"})
    barrier_height: number = 100;

    @property({type: cc.Float, displayName: "障碍物初始生命值", tooltip: "障碍物初始生命值，其实就是障碍物上面文字的数值，当值为0时障碍物销毁。但是这个值并不是最终障碍物初始的生命值，因为最终初始值还加上了随机数，详见Barrier脚本"})
    barrier_health: number = 1;

    @property({type: cc.Float, displayName: "障碍物移动速度", tooltip: "障碍物移动速度，单位是每秒多少个像素"})
    barrier_speed: number = 100;

    @property({type: cc.Float, displayName: "障碍物生成时间间隔", tooltip: "障碍物生成时间间隔，通过控制这个来调整生成频率，最终的频率是（这个变量 * Math.random()） + （障碍物高 / 障碍物移动速度）"})
    generation_interval: number = 0.8;

    @property({type: cc.Float, displayName: "每生成一次障碍物所，障碍物增加的生命值", tooltip: "每生成一次障碍物所，障碍物增加的生命值，最终结果是（这个变量 * Math.random）"})
    increase: number = 2;


    @property({type: cc.Float, displayName: "每秒发射几个炮弹", tooltip: "每秒发射几个炮弹，这个值是始终不变的，当这个值过大时，设备会明显卡顿"})
    bullet_num: number = 10;

    @property({type: cc.Float, displayName: "炮弹发射速度", tooltip: "子弹发射速度,单位是每秒多少个像素，吃到buff会提高"})
    bullet_speed: number = 100;

    @property({type: cc.Float, displayName: "炮弹攻击力", tooltip: "攻击力，炮弹打到障碍物时障碍物减少的生命值，吃到buff会提高"})
    ATK: number = 2;



    @property({type: cc.Float, displayName: "生成buff球的几率", tooltip: "生成buff球的几率，有百分之几的几率生成buff球"})
    probability: number = 5;




    @property({
        type: cc.Float,
        displayName: "buff球相关参数",
        tooltip: "每次吃到buff球时加多少射速？攻击力？0是每次加多少射速，1是每次加多少攻击力",
    })
    add_buff_num: number[] = [100, 5];



    @property({displayName: "是否调试", tooltip: "如果开启，将绘制碰撞的一些形状"})
    is_debug: boolean = false;

    @property({displayName: "是否生成障碍物", tooltip: "是否生成障碍物"})
    is_barrier_create: boolean = true;

    @property({displayName: "是否可以发射炮弹", tooltip: "是否可以发射炮弹，为false时飞机将不在再射炮弹"})
    is_fire: boolean = true;

    @property({displayName: "障碍物和buff是否可以移动", tooltip: "障碍物和buff是否可以移动"})
    is_barrier_move: boolean = true;

    @property({displayName: "飞机和炮弹是否可以移动", tooltip: "飞机和炮弹是否可以移动"})
    is_plane_move: boolean = true;

    @property({displayName: "是否双倍分数", tooltip: "是否双倍分数"})
    is_double: boolean = false;


    score: number = 0;// 分数

    cre_bar: number = 0;// 创建障碍物用的变量 （当前）
    cre_bar_f: number = 0;// 创建障碍物用的变量 （满的）

    l: number = 0;// 生成飞机左侧炮弹用的变量
    r: number = 0;// 生成飞机右侧炮弹用的变量

    // 破纪录了文字节点，如果复活将删除原有破纪录了文字节点  
    lb: cc.Node = null;

    ultimately_score_lb: cc.Label = null;// 显示最终分数的文字


    onLoad () {
        cc.game.setFrameRate(90);

        // 恢复游戏，避免游戏暂停导致无法继续
        cc.director.resume();

        // 给canvas绑定事件
        this.canvas.on(cc.Node.EventType.TOUCH_MOVE, this.onMove, this);

        // 开启碰撞引擎
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // 如果要调试
        if (this.is_debug == true) {
            manager.enabledDebugDraw = true;// 是否绘制碰撞组件的形状，默认为不绘制
            manager.enabledDrawBoundingBox = true;// 是否绘制碰撞组件的包围盒，默认为不绘制
        }

        // 创建障碍物
        this.create_barrier();
        this.cre_bar_f = (this.barrier_height / this.barrier_speed) + Math.random() * this.generation_interval;



        // 生成显示最终得分的文字
        let score_lb = new cc.Node;
        score_lb.parent = this.gameover_UI.children[0];
        score_lb.addComponent(cc.Label);
        score_lb.getComponent(cc.Label).string = "最终得分：" + Math.floor(this.score);
        score_lb.getComponent(cc.Label).overflow = cc.Label.Overflow.SHRINK;
        this.ultimately_score_lb = score_lb.getComponent(cc.Label);
        score_lb.color = cc.color(0, 0, 0, 255);
    }

    update (dt: number): void {
        // 炮弹的生成
        let time = 1 / this.bullet_num;


        // 飞机左侧炮弹生成
        this.l += dt;
        if (this.l > time && this.is_fire == true) {
            // 打印log
            // cc.log("生成左侧炮弹");

            // 清零
            this.l = 0;
            // 创建炮弹
            this.create_bullet(cc.v3(this.bullet_left_pos))
        }
        // cc.log(this.l);


        // 飞机右侧炮弹生成
        this.r += dt;
        if (this.r > time && this.is_fire == true) {
            // 打印log
            // cc.log("生成右侧炮弹");
            // 清零
            this.r = 0;
            // 创建炮弹
            this.create_bullet(cc.v3(this.bullet_right_pos));
        }
        // cc.log(this.r);

        
        // 生成障碍物
        // 如果能生成障碍物就加
        if (this.is_barrier_create == true) {
            this.cre_bar = this.cre_bar + dt;
        }
        // 可以生成障碍物时
        if (this.cre_bar >= this.cre_bar_f) {
            this.cre_bar = 0;
            this.cre_bar_f = (this.barrier_height / this.barrier_speed) + (Math.random() * this.generation_interval);
            this.create_barrier();
        }


        // 显示状态
        let speed = Math.floor(this.bullet_speed);// 子弹射速
        let ATK = Math.floor(this.ATK);// 子弹攻击力
        // 如果速度不为满级正常显示
        if (speed < 10000) {
            this.state_lb[0].string = "子弹射速：" + speed;
        } 
        // 如果速度为满级就显示满级
        else {
            this.state_lb[0].string = "子弹射速：MAX";
        }
        this.state_lb[1].string = "子弹攻击力：" + ATK;


        // 显示分数
        // 如果分数小于1000正常显示
        if (this.score < 1000) {
            this.score_lb.string = "分数：" + Math.floor(this.score);
        }
        // 如果分数大于1000小于10000就用K表示 
        else if (this.score < 10000) {
            let s = (Math.floor(this.score) / 1000).toFixed(2);
            this.score_lb.string = "分数：" + s + "K";
        }
        // 如果分数大于10000就用W表示  
        else {
            let s = (Math.floor(this.score) / 10000).toFixed(2);
            this.score_lb.string = "分数：" + s + "W";
        }


        // 屏幕的上下左右，用来防止飞机飞出屏幕
        let l = - (this.canvas.width / 2) + (this.plane.width / 2);
        let r = (this.canvas.width / 2) - (this.plane.width / 2);
        let t = (this.canvas.height / 2) - (this.plane.height / 2);
        let b = - (this.canvas.height / 2) + (this.plane.height / 2);

        // 超过边界检测
        if (this.plane.x > r) {
            this.plane.x = r;
            // cc.log("右边超出边界");
        }
        if (this.plane.x < l) {
            this.plane.x = l;
            // cc.log("左边超出边界");
        }
        if (this.plane.y > t) {
            this.plane.y = t;
            // cc.log("上边超出边界");
        }
        if (this.plane.y < b) {
            this.plane.y = b;
            // cc.log("下边超出边界");
        }


    }


    // 加分函数，num为加多少分
    add_score (num: number) {
        // 加分
        this.score = this.score + num;
    }
      

    // 移动飞机函数 当手指在屏幕上移动时将执行这个函数
    onMove (event: cc.Event.EventTouch){
        // 打印log
        // console.log("手指在屏幕上移动了");

        /*
        // 触摸点的坐标
        var pos = new cc.Vec2(event.getLocationX(), event.getLocationY());
        // 转换坐标
        pos = this.canvas.convertToNodeSpaceAR(pos);// 将一个点转换到节点 (局部) 空间坐标系，这个坐标系以锚点为原点
        // 给飞机赋值
        this.plane.position = cc.v3(pos);
        */

        // 获取触点在上一次事件时的位置对象，对象包含 x 和 y 属性
        if (this.is_plane_move == true) {
            let last_pos = event.getPreviousLocation();
            // 获取触点位置
            let pos = event.getLocation();
            // 做向量减法
            var dir = last_pos.sub(pos);
            // 移动飞机的坐标
            this.plane.x -= dir.x;
            this.plane.y -= dir.y;
        }
    }


    // 生成炮弹函数，pos为以飞机锚点为原点建立坐标系时炮弹的位置
    create_bullet (pos: cc.Vec3) {
        // 实例出新节点
        let node = cc.instantiate(this.bullet);
        // 父节点为canvas
        node.parent = this.canvas;

        let x = pos.x + this.plane.x;// 获取X
        let y = pos.y + this.plane.y;// 获取Y
        let p = this.canvas.convertToNodeSpaceAR(cc.v3(x, y));// 将坐标转换
        let position: cc.Vec3 = cc.v3(p.x + (this.canvas.width / 2), p.y + (this.canvas.height / 2));// 求出最终坐标 
        node.position = cc.v3(position);// 赋值


        /*
        // 实例出新节点
        let node = cc.instantiate(this.bullet);
        // 父节点为canvas
        node.parent = this.canvas;

        // 把生成位置转换
        let p = this.plane.convertToNodeSpaceAR(pos);
        let x = -(p.x + (this.canvas.width / 2));
        let y = -(p.y + (this.canvas.height / 2));
        node.position = cc.v3(x, y + this.plane.height); 
        */
    }

    
    // 创建障碍物函数
    create_barrier (): void {
        // l为最左边，也就是从哪里开始生成 就是屏幕最左边加上一个随机数
        let l = ((-this.canvas.width / 2) + (this.barrier_width / 2)) + Math.random() * 100;
        // r为最右边，也就是从哪里结束生成 就是屏幕最右边减去一个随机数
        let r = (this.canvas.width / 2) - (this.barrier_width / 2) - Math.random() * 50;
        // 获取屏幕最上面的Y坐标
        let top = (this.canvas.height / 2) + (this.barrier_height / 2);
        // 获取障碍物之间的间距，值是随机的
        let barrier_spacing = this.randomNumber(this.barrier_spacing.x, this.barrier_spacing.y);

        // while循环生成障碍物
        // 如果左边小于右边
        while (l < r) {
            // 利用随机数，有概率生成buff球
            let n = Math.random() * 100;
            if (n > this.probability) {
                // 生成障碍物 Y坐标是屏幕最上方
                let barrier = cc.instantiate(this.barrier);
                barrier.parent = this.barrier_parent;
                barrier.position = cc.v3(l, top);            
            } else if (n < this.probability) {
                // 生成buff球 Y坐标是屏幕最上方
                let buff = cc.instantiate(this.buff);
                buff.parent = this.barrier_parent;
                buff.position = cc.v3(l, top);
            }
            // 随机数生成障碍物的间距
            barrier_spacing = this.randomNumber(this.barrier_spacing.x, this.barrier_spacing.y);
            // 打印log
            // cc.log("生成障碍物，目前值为：" + l.toString());

            // 左边的值加上障碍物的宽和障碍物的间距
            l = l + this.barrier_width + barrier_spacing;
        }

        // 打印log
        // cc.log("创建了障碍物");

        // 障碍物的生命值加上一个随机数
        this.barrier_health += Math.floor(Math.random() * this.increase);
    }


    // 随机数函数 min为最小值 max为最大值 将返回一个number，值大小的范围为min-max
    randomNumber (min: number, max: number): number {
        return(Math.round(Math.random() * (min - max) + max));
    }


    // 增强子弹射速
    enhance_speed () {
        // 增加射速
        this.bullet_speed = this.bullet_speed + this.add_buff_num[0];
        // 射速加的越来越多
        this.add_buff_num[0] = this.add_buff_num[0] * 1.1;


        // 新建一个label来显示吃到的buff
        // 新建节点
        let node = new cc.Node;
        // 父节点是label_parent，这个节点上有Layout组件
        node.parent = this.label_parent;
        // 添加cc.Label
        node.addComponent(cc.Label);
        // 显示内容
        node.getComponent(cc.Label).string = "子弹射速提升";
        // 定时器 1秒后销毁
        this.scheduleOnce(function () {
            node.destroy();
        }, 1);

        // 双倍分数
        this.double_scoere(8);
    }


    // 增强子弹攻击力 在吃到buff的时候调用
    enhance_ATK () {
        // 增加攻击力
        this.ATK = this.ATK + this.add_buff_num[1];
        // 攻击力加的越来越多
        this.add_buff_num[1] = this.add_buff_num[1] * 1.1;


        // 新建一个label来显示吃到的buff
        // 新建节点
        let node = new cc.Node;
        // 父节点是label_parent，这个节点上有Layout组件
        node.parent = this.label_parent;
        // 添加cc.Label
        node.addComponent(cc.Label);
        // 显示内容
        node.getComponent(cc.Label).string = "子弹攻击力提升";
        // 定时器 1秒后销毁
        this.scheduleOnce(function () {
            node.destroy();
        }, 1);

        // 双倍分数
        this.double_scoere(8);
    }


    // 移除所有障碍物函数
    remove_all_barrier () {
        // 获取当前所有障碍物父节点的名字
        let name = this.barrier_parent.name;
        // 销毁所有障碍物的父节点
        this.barrier_parent.destroy();
        // new出一个新的节点代替被销毁的节点

    
        let node = new cc.Node;
        // 名字不变
        node.name = name;
        // 父节点是canvas
        node.parent = this.canvas;
        // 坐标是0,0
        node.position = cc.v3(0, 0);
        // 所有障碍物父节点变量赋值
        this.barrier_parent = node;
    }


    // 复活函数
    resurgence () {
        // 恢复暂停的场景
        cc.director.resume();
        // 关闭游戏结束时显示的UI
        this.gameover_UI.active = false;
        // 移除所有障碍物，如果不移除，游戏将再次结束
        this.remove_all_barrier();
        // 显示飞机
        this.plane.active = true;

        // 隐藏复活按钮
        this.btn_resurgence.active = false;

        // 显示所有特殊按钮
        this.special_btn.active = true;

        // 销毁破纪录了文字节点
        this.lb.destroy();
    }


    // 返回开始场景函数
    back () {
        cc.director.loadScene("Start");
    }


    // 重新开始游戏函数
    replay () {
        cc.director.loadScene("Game");
    }


    // 游戏结束函数
    gameover () {
        // 打印log
        cc.log("游戏结束");
        // 将游戏暂停
        cc.director.pause();
        // 显示游戏结束的UI
        this.gameover_UI.active = true;
        // 隐藏飞机
        this.plane.active = false;


        // 更新最终分数
        this.ultimately_score_lb.string = "最终得分：" + Math.floor(this.score);
        // 获取历史最高分
        let score = cc.sys.localStorage.getItem("score");
        // 如果破纪录了  更新历史最高分
        if (this.score > score) {
            cc.sys.localStorage.setItem("score", this.score);
            cc.log("破纪录了！");


            // 生成显示破纪录的文字
            let lb = new cc.Node;
            lb.addComponent(cc.Label);
            lb.getComponent(cc.Label).string = "破纪录了！";
            lb.color = cc.color(0, 0, 0, 255);
            lb.parent = this.gameover_UI.children[0];

            // 获取破纪录了文字节点
            this.lb = lb;
        }

        // 隐藏所有特殊按钮
        this.special_btn.active = false;
    }


    // 双倍分数函数，执行后得分会翻倍，time为多少秒后恢复
    double_scoere (time: number) {
        let self = this;
        // 开启双倍分数并且显示文字
        this.is_double = true;
        this.double_lb.active = true;
        // 定时器关闭双倍分数并且隐藏文字
        this.scheduleOnce (function () {
            self.is_double = false;
            self.double_lb.active = false;
        }, time); 
    }


    // 无敌函数
    invincible () {
        let self = this;
        // 将飞机分组设为无敌
        this.plane.group = "invincible";

        // 显示粒子特效
        this.plane.children[0].active = true;
        this.plane.children[1].active = true;

        this.scheduleOnce (function () {
            self.plane.group = "default";
            self.plane.children[0].active = false;
            self.plane.children[1].active = false;
        }, this.invincible_time);

        let lb = cc.instantiate(this.invincible_lb_pre);
        lb.parent = this.label_parent;
        this.scheduleOnce (function () {
            lb.destroy();
        }, this.invincible_time);
    }
    


}