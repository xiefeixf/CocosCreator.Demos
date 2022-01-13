const {ccclass, property} = cc._decorator;

@ccclass
export default class Music extends cc.Component {

    @property({type: cc.AudioSource, displayName: "背景音乐", tooltip: "背景音乐"})
    bg_music: cc.AudioSource = null;

    @property({type: cc.AudioSource, displayName: "碰撞音效", tooltip: "碰撞音效"})
    collision: cc.AudioSource = null;

    @property({type: cc.AudioSource, displayName: "buff音效", tooltip: "buff音效"})
    buff: cc.AudioSource = null;

    @property({type: cc.AudioSource, displayName: "按钮音效", tooltip: "按钮音效"})
    btn: cc.AudioSource = null;


    // 播放碰撞音效
    play_music_collision () {
        this.collision.play();
    }

    // 播放buff音效
    play_music_buff () {
        this.buff.play();
    }

    // 播放点击按钮音效
    play_music_btn () {
        this.btn.play();
    }

}
