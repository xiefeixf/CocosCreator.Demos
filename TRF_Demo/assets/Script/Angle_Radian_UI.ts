// 导入Main脚本
import Main from "./Main";

import { _decorator, Component, EditBox } from 'cc';
const {ccclass, property} = _decorator;

@ccclass('AngleRadianUI')
export default class Angle_Radian_UI extends Component {

    
    @property({displayName: "Main脚本所在节点", tooltip: "Main脚本所在节点", type: Main})
    Main: Main = null!;


    @property({displayName: "弧度输入框", tooltip: "弧度输入框", type: EditBox})
    radian_ui: EditBox = null!;

    @property({displayName: "角度输入框", tooltip: "角度输入框", type: EditBox})
    angle_ui: EditBox = null!;


    // 转角度按钮专用函数
    onbtn_angle () {
        // 如果输入框内容不为空而且是数字
        if (this.radian_ui.string !== "" || isNaN(Number(this.radian_ui.string))) {
            // 计算出角度并显示在输入框上
            let a = this.Main.radian_to_angle(Number(this.radian_ui.string));
            this.radian_ui.string = a.toString();
        }
    }


    // 转弧度按钮专用函数
    onbtn_radian () {
        // 如果输入框内容不为空而且是数字
        if (this.angle_ui.string !== "" || isNaN(Number(this.angle_ui.string))) {
            // 计算出弧度并显示在输入框上
            let a = this.Main.angle_to_radian(Number(this.angle_ui.string));
            this.angle_ui.string = a.toString();
        }
    }


    
}




/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// // 导入Main脚本
// import Main from "./Main";
// const {ccclass, property} = cc._decorator;
// 
// @ccclass
// export default class Angle_Radian_UI extends cc.Component {
// 
// 
//     @property({displayName: "Main脚本所在节点", tooltip: "Main脚本所在节点", type: Main})
//     Main: Main = null;
// 
// 
//     @property({displayName: "弧度输入框", tooltip: "弧度输入框", type: cc.EditBox})
//     radian_ui: cc.EditBox = null;
// 
//     @property({displayName: "角度输入框", tooltip: "角度输入框", type: cc.EditBox})
//     angle_ui: cc.EditBox = null;
// 
//     // 转角度按钮专用函数
//     onbtn_angle () {
//         // 如果输入框内容不为空而且是数字
//         if (this.radian_ui.string !== "" || isNaN(Number(this.radian_ui.string))) {
//             // 计算出角度并显示在输入框上
//             let a = this.Main.radian_to_angle(Number(this.radian_ui.string));
//             this.radian_ui.string = a.toString();
//         }
//         
//     }
// 
//     // 转弧度按钮专用函数
//     onbtn_radian () {
//         // 如果输入框内容不为空而且是数字
//         if (this.angle_ui.string !== "" || isNaN(Number(this.angle_ui.string))) {
//             // 计算出弧度并显示在输入框上
//             let a = this.Main.angle_to_radian(Number(this.angle_ui.string));
//             this.angle_ui.string = a.toString();
//         }
//     }
// 
// 
// }
