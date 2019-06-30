/**
 * Created by McZ on 2019/2/26.
 */
var dataList;
var cb = {
    tiemr:null,
    deg:0,
    playCB(){
        var self = this;
        this.tiemr = setInterval(function(){
            self.deg += 2;
            $('.imgbox').css({
                'transform':`rotateZ(${self.deg}deg)`,
                'transition':'all 0.2s ease-in'
            });
        },100)
    },
    pauseCB(){
        clearInterval(this.tiemr);
    }
}
var audio = new player.audioManager(cb);
var controlI;

function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            dataList = data;
            controlI = new player.controlIndex(dataList.length);
            playChange(0);
            bindEvent();
        },
        error: function () {
            console.log("error");
        }
    })
};

function playChange(index) {
    cb.deg = 0;
    $('.imgbox').css({
        'transform':`rotateZ(${cb.deg}deg)`,
        'transition':'none'
    });
    player.render(dataList[index]);
    audio.getAudio(dataList[index].audio);
};

function bindEvent() {
    $('.prev').on('click', function () {
        var i = controlI.prev();
        playChange(i);
    });
    $('.next').on('click', function () {
        var i = controlI.next();
        playChange(i);
    });
    $('.play').on('click', function () {
        if (audio.status == 'pause') {
            audio.play();
        } else {
            audio.pause();
        }
        $('.play').toggleClass('playing');
    });
};
getData("../mock/data.json");