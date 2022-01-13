import music from "./Music";// 导入music脚本
import gc from "./GameController";// 导入GameController脚本
const {ccclass, property} = cc._decorator;

@ccclass
export default class Game_Menu extends cc.Component {

    @property({type: music, displayName: "Music脚本所在节点", tooltip: "Music脚本所在节点"})
    music: music = null;

    @property({type: gc, displayName: "GameController脚本所在节点", tooltip: "GameController脚本所在节点"})
    gc: gc = null;

    @property(cc.Node)
    canvas: cc.Node = null;

    @property({type: cc.Node, displayName: "菜单节点", tooltip: "菜单节点"})
    menu_UI: cc.Node = null;

    @property({type: cc.Node, displayName: "菜单按钮", tooltip: "菜单按钮"})
    menu_btn: cc.Node = null;

    @property({type: cc.Slider, displayName: "背景音乐音量滑动器", tooltip: "背景音乐音量滑动器"})
    sound_sd0: cc.Slider = null;

    @property({type: cc.Slider, displayName: "音效音量滑动器", tooltip: "音效音量滑动器"})
    sound_sd1: cc.Slider = null;

    // 菜单在屏幕最上方时的位置
    pos: cc.Vec3 = null;

    onLoad () {
        // 将菜单移动到屏幕最上方
        let t = (this.canvas.height / 2);
        let y = t + this.menu_UI.height;
        this.menu_UI.position = cc.v3(0, y);
        // 获取一下菜单在屏幕最上方时的位置
        this.pos = this.menu_UI.position;
        // 显示菜单
        this.menu_UI.active = true;
    }

    // 滑动背景音乐滑动器时调用的函数
    set_sound0 () {
        // 把滑动器的值赋给音乐
        this.music.bg_music.volume = this.sound_sd0.progress;
    }

    // 滑动音效滑动器时调用的函数
    set_sound1 () {
        // 把滑动器的值赋给音效
        this.music.collision.volume = this.sound_sd1.progress;
        this.music.buff.volume = this.sound_sd1.progress;
        this.music.btn.volume = this.sound_sd1.progress;
    }

    // 打开菜单函数
    open_menu () {
        // 动作和缓动
        let move = cc.moveTo(1, 0, 0).easing(cc.easeBackOut());
        // 执行
        this.menu_UI.runAction(move);
        // 暂停游戏
        this.pause();
        // 禁用按钮
        this.menu_btn.getComponent(cc.Button).interactable = false;
    }

    // 关闭菜单函数
    close_menu () {
        let self = this;

        // 动作和缓动
        let move = cc.moveTo(1, cc.v2(this.pos)).easing(cc.easeBackOut());
        // 启用按钮
        let f = cc.callFunc(function () {
            self.menu_btn.getComponent(cc.Button).interactable = true;
        });
        // 两个结合在一起
        let action = cc.sequence(move, f);
        // 执行
        this.menu_UI.runAction(action);
        // 恢复游戏
        this.resume();
    }

    // 恢复游戏函数
    resume () {
        this.gc.is_barrier_move = true;
        this.gc.is_plane_move = true;
        this.gc.is_fire = true;
        this.gc.is_barrier_create = true;
    }

    // 暂停游戏函数
    pause () {
        this.gc.is_barrier_move = false;
        this.gc.is_plane_move = false;
        this.gc.is_fire = false;
        this.gc.is_barrier_create = false;
    }

}
