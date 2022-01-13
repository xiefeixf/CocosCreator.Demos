
import SkillBtn from "./Skill_Btn";

import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Onbtn')
export class Onbtn extends Component {

    @property({displayName: "特效动画", tooltip: "特效动画", type: Node})
    skill: Node = null!;

    onbtn () {
        // 显示动画
        this.skill.active = true;

        // 获取Skill_Btn脚本
        let skill_btn: SkillBtn = this.node.getComponent(SkillBtn);

        // 技能冷却好了之后隐藏动画
        this.scheduleOnce(() => {
            this.skill.active = false;
        }, skill_btn.time);

        console.log("播放了技能动画");
    }

}