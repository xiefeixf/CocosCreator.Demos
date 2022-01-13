import Bullet from "./Bullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Prop_control extends cc.Component {

    @property({type: cc.Button, displayName: "道具按钮", tooltip: "道具按钮"})
    btn: cc.Button[] = [];

    @property({type: cc.Label, displayName: "显示道具按钮还可以用几次的文字", tooltip: "显示道具按钮还可以用几次的文字"})
    time_lb: cc.Label[] = [];

    @property({type: cc.Float, displayName: "道具按钮可以使用几次？", tooltip: "道具按钮可以使用几次？"})
    time: number[] = [];

    update () {
        // 每帧更新文字显示内容
        this.time_lb[0].string = this.time[0].toString();
        this.time_lb[1].string = this.time[1].toString();

        // 如果没有使用次数了，禁用按钮
        if (this.time[0] <= 0 ) {
            this.btn[0].interactable = false;
        } else {
            this.btn[0].interactable = true;
        }

        if (this.time[1] <= 0 ) {
            this.btn[1].interactable = false;
        } else {
            this.btn[1].interactable = true;
        }
    }

    // 按钮按下时减少一次使用次数
    onbtn0 () {
        this.time[0] -= 1;
    }

    onbtn1 () {
        this.time[1] -= 1;
    }

}
