import { _decorator, Component, Node, CCFloat, Vec2, Vec3, find, log } from 'cc';
const {ccclass, property} = _decorator;

@ccclass('Main')
export default class Main extends Component {


    @property({displayName: "小球", tooltip: "小球", type: Node})
    ball: Node = null!;

    @property({displayName: "中心红点", tooltip: "中心红点", type: Node})
    point: Node = null!;


    @property({displayName: "运动半径", tooltip: "运动半径", type: CCFloat})
    r: number = 200;

    @property({displayName: "每帧运动角度", tooltip: "每帧运动角度", type: CCFloat})
    angle_nor: number = 1;


    @property({displayName: "中心红点位置偏移量", tooltip: "中心红点位置偏移量"})
    offset: Vec2 = new Vec2(0, 0);


    // 下一帧需要运动的角度
    angle: number = 0;


    onLoad () {
        // 将小球的坐标设置到最右边
        this.ball!.position = new Vec3(this.r, 0);
        // 设置下一帧需要运动的角度为最开始的角度
        this.angle = this.angle_nor;
    }


    update () {
        // log(this.angle);
        // 将每帧运动的角度计算成弧度
        let radian = this.angle_to_radian(this.angle);
        // 算出X和Y的坐标
        let x = this.r * Math.cos(radian);
        let y = this.r * Math.sin(radian);
        // 设置小球的坐标
        this.ball!.position = new Vec3(x + this.offset.x, y + this.offset.y);
        // 将下一帧需要运动的角度增加
        this.angle += this.angle_nor;

        // 如果下一帧需要运动的角度大于等于了360°
        if (this.angle >= 360) {
            // 取余360   也就是说angle的值不会超过360度
        this.angle %= 360;
        }

        // 每帧更新中心红点位置
        this.point!.position = new Vec3(this.offset.x, this.offset.y);
    }


    // 角度转弧度
    angle_to_radian (angle: number): number {
        // 角度转弧度公式
        // π / 180 * 角度

        // 计算出弧度
        let radian = Math.PI / 180 * angle;
        // 返回弧度
        return(radian);
    }


    // 弧度转角度
    radian_to_angle (radian: number): number {
        // 弧度转角度公式
        // 180 / π * 弧度

        // 计算出角度
        let angle = 180 / Math.PI * radian;
        // 返回弧度
        return(angle);
    }


    // ！！！！！！！！其使用Math.atan2求出弧度再转角度一样的效果
    // 角度转向量   
    angle_to_vector (angle: number): Vec2 {
        // tan = sin / cos
        // 将传入的角度转为弧度
        let radian = this.angle_to_radian(angle);
        // 算出cos,sin和tan
        let cos = Math.cos(radian);// 邻边 / 斜边
        let sin = Math.sin(radian);// 对边 / 斜边
        let tan = sin / cos;// 对边 / 邻边
        // 结合在一起并归一化
        let vec = new Vec2(cos, sin).normalize();
        // 返回向量
        return(vec);
    }


    // 向量转角度
    vector_to_angle (vector: Vec2): number {
        // 将传入的向量归一化
        let dir = vector.normalize();
        // 计算出目标角度的弧度
        let radian = dir.signAngle(new Vec2(1, 0));
        // 把弧度计算成角度
        let angle = -this.radian_to_angle(radian);
        // 返回角度
        return(angle);
    }
   
    

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// const {ccclass, property} = cc._decorator;
// 
// @ccclass
// export default class Main extends cc.Component {
// 
//     @property({displayName: "小球", tooltip: "小球", type: cc.Node})
//     ball: cc.Node = null;
// 
//     @property({displayName: "中心红点", tooltip: "中心红点", type: cc.Node})
//     point: cc.Node = null;
// 
//     @property({displayName: "运动半径", tooltip: "运动半径", type: cc.Float})
//     r: number = 200;
// 
//     @property({displayName: "每帧运动角度", tooltip: "每帧运动角度", type: cc.Float})
//     angle_nor: number = 1;
// 
//     @property({displayName: "中心红点位置偏移量", tooltip: "中心红点位置偏移量"})
//     offset: cc.Vec2 = new cc.Vec2(0, 0);
// 
//     // 下一帧需要运动的角度
//     angle: number = 0;
// 
//     onLoad () {
//         // 将小球的坐标设置到最右边
//         this.ball.position = new cc.Vec3(this.r, 0);
//         // 设置下一帧需要运动的角度为最开始的角度
//         this.angle = this.angle_nor;
//     }
// 
//     update () {
//         // cc.log(this.angle);
//         // 将每帧运动的角度计算成弧度
//         let radian = this.angle_to_radian(this.angle);
//         // 算出X和Y的坐标
//         let x = this.r * Math.cos(radian);
//         let y = this.r * Math.sin(radian);
//         // 设置小球的坐标
//         this.ball.position = new cc.Vec3(x + this.offset.x, y + this.offset.y);
//         // 将下一帧需要运动的角度增加
//         this.angle += this.angle_nor;
// 
//         // 如果下一帧需要运动的角度大于等于了360°
//         if (this.angle >= 360) {
//             // 取余360   也就是说angle的值不会超过360度
//             this.angle %= 360;
//         }
// 
//         // 每帧更新中心红点位置
//         this.point.position = new cc.Vec3(this.offset.x, this.offset.y);
//     }
// 
//     // 角度转弧度
//     angle_to_radian (angle: number): number {
//         // 角度转弧度公式
//         // π / 180 * 角度
// 
//         // 计算出弧度
//         let radian = Math.PI / 180 * angle;
//         // 返回弧度
//         return(radian);
//     }
// 
//     // 弧度转角度
//     radian_to_angle (radian: number): number {
//         // 弧度转角度公式
//         // 180 / π * 弧度
// 
//         // 计算出角度
//         let angle = 180 / Math.PI * radian;
//         // 返回弧度
//         return(angle);
//     }
// 
// 
//     // ！！！！！！！！其使用Math.atan2求出弧度再转角度一样的效果
//     // 角度转向量   
//     angle_to_vector (angle: number): cc.Vec2 {
//         // tan = sin / cos
//         // 将传入的角度转为弧度
//         let radian = this.angle_to_radian(angle);
//         // 算出cos,sin和tan
//         let cos = Math.cos(radian);// 邻边 / 斜边
//         let sin = Math.sin(radian);// 对边 / 斜边
//         let tan = sin / cos;// 对边 / 邻边
//         // 结合在一起并归一化
//         let vec = new cc.Vec2(cos, sin).normalizeSelf();
//         // 返回向量
//         return(vec);
//     }
// 
//     // 向量转角度
//     vector_to_angle (vector: cc.Vec2): number {
//         // 将传入的向量归一化
//         let dir = vector.normalizeSelf();
//         // 计算出目标角度的弧度
//         let radian = dir.signAngle(new cc.Vec2(1, 0));
//         // 把弧度计算成角度
//         let angle = -this.radian_to_angle(radian);
//         // 返回角度
//         return(angle);
//     }
// 
//     onbtn () {
//         cc.log("出log")
//     }
// 
// 
// }
