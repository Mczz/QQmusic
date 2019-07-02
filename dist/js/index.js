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
        },100);
        player.pro.start();
        
12    },
    pauseCB(){
        clearInterval(this.tiemr);
        player.pro.stop();
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
            bindTouch();
        },
        error: function () {
            console.log("error");
        }
    })
};

function playChange(index) {
    //恢复圆盘位置
    cb.deg = 0;
    $('.imgbox').css({
        'transform':`rotateZ(${cb.deg}deg)`,
        'transition':'none'
    });
    player.render(dataList[index]);
    player.pro.renderTime(dataList[index].duration);
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
    audio.audio.onended = function(){
        var i = controlI.next();
        playChange(i);
    }
};
function bindTouch(){
    var $spot = $('.pro-slider');
    var bottom = $('.pro-outer').offset();
    var l = bottom.left;
    var w = bottom.width;
    $spot.on('touchstart',function(){
        audio.pause();
    });
    $spot.on('touchmove',function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w;
        if(per >= 0 && per <= 1){
            player.pro.updatePro(per);
        }
    });
    $spot.on('touchend',function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w;
        if(per >= 0 && per <= 1){
            var time = per * dataList[controlI.index].duration;
            player.pro.start(per);
            audio.play();
            audio.playTo(time);
        }else if(audio.audio.readyState){
            audio.play();
        }
    });
}
getData("../mock/data.json");