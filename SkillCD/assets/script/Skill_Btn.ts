
import { _decorator, Component, Node, SpriteComponent, LabelComponent, CCFloat, CCBoolean, Button, SystemEventType, ButtonComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SkillBtn')
export default class SkillBtn extends Component {

    @property({displayName: "技能精灵", tooltip: "技能精灵", type: SpriteComponent, displayOrder: 1})
    skill: SpriteComponent = null!;

    @property({displayName: "技能冷却时间", tooltip: "技能冷却时间", type: CCFloat, displayOrder: 2})
    time: number = 3;

    @property({displayName: "是否显示文字", tooltip: "是否显示文字", displayOrder: 3})
    is_show_label: boolean = true;

    @property({
        displayName: "是否显示小数", 
        tooltip: "是否显示小数", 
        visible: function () {
            return(this.is_show_label);
        }, 
        displayOrder: 4,
    })
    is_decimals: boolean = true;


    @property({
        displayName: "显示技能冷却剩余时间的文字", 
        tooltip: "显示技能冷却剩余时间的文字", 
        visible: function () {
            return(this.is_show_label);
        }, 
        type: LabelComponent, 
        displayOrder: 5,
    })
    time_label: LabelComponent = null;

    // 技能按钮的button
    btn: ButtonComponent = null!;

    onLoad () {
        // 游戏开始的时候技能的填充范围是1
        this.skill.fillRange = 1;

        // 获取button
        this.btn = this.skill.getComponent(ButtonComponent)!;
    }

    update (dt:number) {
        // 如果技能精灵的填充不为1 也就是说已经使用了技能
        if (this.skill.fillRange < 1) {

            // 恢复技能   每帧恢复的值为帧率 / 技能冷却时间
            this.skill.fillRange += dt / this.time;

            // 如果显示小数
            if (this.is_decimals == true) {
                // 每帧更新技能剩余时间
                this.time_label.string = ((1 - this.skill.fillRange) * this.time).toFixed(1).toString();
            } else {
                // 每帧更新技能剩余时间
                this.time_label.string = Math.round(((1 - this.skill.fillRange) * this.time)).toString();
            }

        }

        // 如果技能精灵的填充为1 也就是说技能还没被使用
        if (this.skill.fillRange == 1) {
            // 隐藏技能冷却剩余时间
            this.time_label.node.active = false;
        }
    }

    // 按下按钮
    onbtn () {
        // 技能填充范围设置为0
        this.skill.fillRange = 0;
        // 禁用按钮
        this.btn.interactable = false;

        // 计时器，用来启用按钮
        this.scheduleOnce(() => {
            // 启用按钮
            this.btn.interactable = true;
        }, this.time);

        // 如果可以显示文字
        if(this.is_show_label == true){
            // 显示技能冷却剩余时间
            this.time_label.node.active = true;
        }

        console.log("使用了技能");
    }

}