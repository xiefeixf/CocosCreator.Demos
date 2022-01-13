// 导入Main脚本
import Main from "./Main";

import { _decorator, Component, EditBox, Label, log, Vec2 } from 'cc';
const {ccclass, property} = _decorator;

@ccclass('UI')
export default class UI extends Component {

    
    @property({displayName: "Main脚本所在节点", tooltip: "Main脚本所在节点", type: Main})
    Main: Main = null!;


    @property({displayName: "小球运动半径输入框", tooltip: "小球运动半径输入框", type: EditBox})
    r_ui: EditBox = null!;

    @property({displayName: "每帧运动角度输入框", tooltip: "每帧运动角度输入框", type: EditBox})
    angle_ui: EditBox = null!;

    @property({displayName: "X偏移量输入框", tooltip: "X偏移量输入框", type: EditBox})
    X_ui: EditBox = null!;

    @property({displayName: "Y偏移量输入框", tooltip: "Y偏移量输入框", type: EditBox})
    Y_ui: EditBox = null!;


    @property({displayName: "显示小球运动半径的文字", tooltip: "显示小球运动半径的文字", type: Label})
    r_lb: Label = null!;

    @property({displayName: "显示每帧运动角度的文字", tooltip: "显示每帧运动角度的文字", type: Label})
    angle_lb: Label = null!;

    @property({displayName: "显示X和Y偏移量的文字", tooltip: "显示X和Y偏移量的文字", type: Label})
    XY_lb: Label = null!;


    update () {
        // 每帧更新文字显示内容
        this.r_lb.string = "当前运动半径：" + this.Main.r;
        this.angle_lb.string = "当前每帧运动角度：" + this.Main.angle_nor;
        this.XY_lb.string = "当前中心红点偏移量X:" + this.Main.offset.x + "   " + "Y:" + this.Main.offset.y;
    }

    // 应用设置按钮专用函数
    onbtn_apply (): boolean {
        // 挨个获取每个输入框的输入内容
        let a = this.r_ui.string;
        let b = this.angle_ui.string;
        let c = this.X_ui.string;
        let d = this.Y_ui.string;

        // 检测每个输入内容是否为数字
        let a1 = isNaN(Number(a));
        let b1 = isNaN(Number(b));
        let c1 = isNaN(Number(c));
        let d1 = isNaN(Number(d));

        // 如果其中有一个输入内容不为数字
        if (a1 == true || b1 == true || c1 == true || d1 == true) {
            // 打印log
            log("输入框有非数字字符串");
            // 返回false
            return(false);
        }

        // 打印log
        log("输入框没有非数字字符串");
        this.apply();
        // 返回true
        return(true);
    }
    
    // 应用所有设置专用函数
    apply () {
        // 挨个获取每个输入框的输入内容
        let a = this.r_ui.string;
        let b = this.angle_ui.string;
        let c = this.X_ui.string;
        let d = this.Y_ui.string;

        // 挨个获取每个输入框的输入内容   并转化为数字
        let a1 = Number(this.r_ui.string);
        let b1 = Number(this.angle_ui.string);
        let c1 = Number(this.X_ui.string);
        let d1 = Number(this.Y_ui.string);

        // 将输入框的内容传给Main脚本的各个变量   如果输入框不为空的话
        if (a !== "") {
            this.Main.r = a1;
        }
        if (b !== "") {
            this.Main.angle_nor = b1;
        }
        if (c !== "" || d !== "") {
            this.Main.offset = new Vec2(c1, d1);
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
// export default class UI extends cc.Component {
// 
//     @property({displayName: "Main脚本所在节点", tooltip: "Main脚本所在节点", type: Main})
//     Main: Main = null;
// 
//     @property({displayName: "小球运动半径输入框", tooltip: "小球运动半径对话框", type: cc.EditBox})
//     r_ui: cc.EditBox = null;
// 
//     @property({displayName: "每帧运动角度输入框", tooltip: "每帧运动角度输入框", type: cc.EditBox})
//     angle_ui: cc.EditBox = null;
// 
//     @property({displayName: "X偏移量输入框", tooltip: "X偏移量输入框", type: cc.EditBox})
//     X_ui: cc.EditBox = null;
// 
//     @property({displayName: "Y偏移量输入框", tooltip: "Y偏移量输入框", type: cc.EditBox})
//     Y_ui: cc.EditBox = null;
// 
//     @property({displayName: "显示小球运动半径的文字", tooltip: "显示小球运动半径的文字", type: cc.Label})
//     r_lb: cc.Label = null;
// 
//     @property({displayName: "显示每帧运动角度的文字", tooltip: "显示每帧运动角度的文字", type: cc.Label})
//     angle_lb: cc.Label = null;
// 
//     @property({displayName: "显示X和Y偏移量的文字", tooltip: "显示X和Y偏移量的文字", type: cc.Label})
//     XY_lb: cc.Label = null;
// 
//     update () {
//         // 每帧更新文字显示内容
//         this.r_lb.string = "当前运动半径：" + this.Main.r;
//         this.angle_lb.string = "当前每帧运动角度：" + this.Main.angle_nor;
//         this.XY_lb.string = "当前中心红点偏移量X:" + this.Main.offset.x + "   " + "Y:" + this.Main.offset.y;
//     }
// 
//     // 应用设置按钮专用函数
//     onbtn_apply (): boolean {
//         // 挨个获取每个输入框的输入内容
//         let a = this.r_ui.string;
//         let b = this.angle_ui.string;
//         let c = this.X_ui.string;
//         let d = this.Y_ui.string;
// 
//         // 检测每个输入内容是否为数字
//         let a1 = isNaN(Number(a));
//         let b1 = isNaN(Number(b));
//         let c1 = isNaN(Number(c));
//         let d1 = isNaN(Number(d));
// 
//         // 如果其中有一个输入内容不为数字
//         if (a1 == true || b1 == true || c1 == true || d1 == true) {
//             // 打印log
//             cc.log("输入框有非数字字符串");
//             // 返回false
//             return(false);
//         }
// 
//         // 打印log
//         cc.log("输入框没有非数字字符串");
//         this.apply();
//         // 返回true
//         return(true);
//     }
// 
//     // 应用所有设置专用函数
//     apply () {
//         // 挨个获取每个输入框的输入内容
//         let a = this.r_ui.string;
//         let b = this.angle_ui.string;
//         let c = this.X_ui.string;
//         let d = this.Y_ui.string;
// 
//         // 挨个获取每个输入框的输入内容   并转化为数字
//         let a1 = Number(this.r_ui.string);
//         let b1 = Number(this.angle_ui.string);
//         let c1 = Number(this.X_ui.string);
//         let d1 = Number(this.Y_ui.string);
// 
//         // 将输入框的内容传给Main脚本的各个变量   如果输入框不为空的话
//         if (a !== "") {
//             this.Main.r = a1;
//         }
//         if (b !== "") {
//             this.Main.angle_nor = b1;
//         }
//         if (c !== "" || d !== "") {
//             this.Main.offset = new cc.Vec2(c1, d1);
//         }
//     }
// 
// }
