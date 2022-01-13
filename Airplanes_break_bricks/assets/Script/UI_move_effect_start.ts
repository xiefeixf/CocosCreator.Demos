const {ccclass, property} = cc._decorator;

@ccclass
export default class UI_move_effect_start extends cc.Component {

    @property(cc.Node)
    canvas: cc.Node = null;


    @property({type: cc.Node, displayName: "从上向下飞", tooltip: "从上向下飞的节点"})
    t_b: cc.Node = null;

    @property({type: cc.Float, displayName: "从上向下飞，飞到距离屏幕最上面多少", tooltip: "从上向下飞，飞到距离屏幕最上面多少"})
    t_b_num: number = 200;



    @property({type: cc.Node, displayName: "从下向上飞", tooltip: "从下向上飞的节点"})
    b_t: cc.Node = null;

    @property({type: cc.Float, displayName: "从下向上飞，飞到距离屏幕最下面多少", tooltip: "从下向上飞，飞到距离屏幕最下面多少"})
    b_t_num: number = 30;



    @property({type: cc.Node, displayName: "从左向右飞", tooltip: "从左向右飞的节点"})
    l_r: cc.Node = null;



    start () {
        // canvas的上下左右
        let l = - (this.canvas.width / 2);
        let r = (this.canvas.width / 2);
        let t = (this.canvas.height / 2);
        let b = - (this.canvas.height / 2);


        // 从上向下飞动作
        // 最终位置
        let y0 = t - (this.t_b.height / 2) - this.t_b_num;
        // 初始位置
        this.t_b.y = t + (this.t_b.height / 2);

        // 执行moveTo动作  并使用缓动
        let move0 = cc.moveTo(0.7, cc.v2(0, y0)).easing(cc.easeBackOut());

        this.t_b.runAction(move0);




        // 从下往上飞动作
        // 最终位置
        let y1 = b + (this.b_t.height / 2) + this.b_t_num;
        // 初始位置
        this.b_t.y = b - (this.b_t.height / 2);

        // 执行moveTo动作  并使用缓动
        let move2 = cc.moveTo(1.2, cc.v2(0, y1)).easing(cc.easeBackOut());

        this.b_t.runAction(move2);




        // 从左向右飞动作
        // 初始位置
        this.l_r.x = l - (this.l_r.height / 2);

        // 执行moveTo动作  并使用缓动
        let move1 = cc.moveTo(1.5, cc.v2(0, 0)).easing(cc.easeBackOut());

        this.l_r.runAction(move1);
    }

}
