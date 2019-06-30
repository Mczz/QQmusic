/**
 * Created by McZ on 2019/3/18.
 */
/*渲染页面*/
(function ($,root){
    function renderImg(src){
        var img = new Image();
        img.src = src;
        img.onload = function(){
            $(".imgbox img").attr("src",src);
            root.blurImg(img,$('body'));
        }
    }
    function renderInfo(info){
        var str ='<div class="song-name">' + info.song + '</div> \
            <div class="singer-name">' + info.singer + '</div>\
            <div class="album-name">' + info.album + '</div>';
        $('.song-info').html(str);
    }
    function renderIsLike(like){
        if(like){
            $('.control .like').addClass('liking');
        }else {
            $('.control .like').removeClass('liking');
        }
    }
    function render(data){

        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    }
    root.render = render;
})(window.Zepto,window.player || (window.player = {}));