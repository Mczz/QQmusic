(function ($, root) {
    var allTime,
        startTime,
        frameId;
    var lastPer = 0;
    function renderTime(alltime){
        lastPer = 0;
        startTime = new Date().getTime();
        allTime = alltime;
        updatePro(0);
        var m = Math.floor(allTime/60);
        var s = allTime % 60;
        m = m > 9 ? m : '0' + m;
        s = s > 9 ? s : '0' + s; 
        var time = m + ":" + s;
        $('.all-time').html(time);
    }
    function start(per) {
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        lastPer = per ? per : lastPer; 
        function frame() {
            var curTime = new Date().getTime();
            var per =  lastPer + (curTime - startTime) / (allTime * 1000);
            updatePro(per);
            if(per <= 1 ){
                frameId = requestAnimationFrame(frame);
            }else{
                cancelAnimationFrame(frameId)
            }
        }
        frame();
    }
    function updatePro(per){
        var curTime = Math.round(allTime * per);
        var m = Math.floor(curTime / 60);
            var s = curTime % 60;
            m = m > 9 ? m : '0' + m;
            s = s > 9 ? s : '0' + s;
            var time = m + ":" + s;
            $('.current-time').html(time);
            $('.pro-inner').css({
                'transform': `translateX(-${100 - 100 * per}%)`
            })
    }
    function stop(){
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (allTime * 1000);
    }
    root.pro = {
        start,
        stop,
        renderTime,
        updatePro
    }
})(window.Zepto, window.player || (window.player = {}))