(function ($, root) {

    function AudioManager(CB) {
        this.audio = new Audio();
        this.status = 'pause';
        this.CB = CB;
    };
    AudioManager.prototype.play = function () {
        this.audio.play();
        this.status = 'play';
        if (this.CB.playCB) {
            this.CB.playCB();
        }
    };
    AudioManager.prototype.pause = function () {
        this.audio.pause();
        this.status = 'pause';
        if (this.CB.pauseCB) {
            this.CB.pauseCB();
        }
    };
    AudioManager.prototype.getAudio = function (src) {
        this.audio.src = src;
        this.audio.load();
        if (this.status == 'play') {
            this.audio.play();
        }

    };
    AudioManager.prototype.playTo = function (t) {
            this.audio.currentTime = t;
    };
    root.audioManager = AudioManager;

})(window.Zepto, window.player || (window.player = {}))