/**
 * Created by McZ on 2019/2/26.
 */
var gulp = require('gulp');
//压缩html
var htmlClean = require('gulp-htmlclean');
//压缩图片
var iamgeMin = require('gulp-imagemin');
//压缩js
var uglify = require('gulp-uglify');
//去掉debug
var debug = require('gulp-strip-debug');
//less-->css
var less = require('gulp-less');
//压缩css
var cssClean = require('gulp-clean-css');
//自动添加前缀 postcss 参数 autoprefixer
var  postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
//服务器
var connect = require('gulp-connect');

var folder = {
    src:"src/",
    dist:"dist/"
};
//判断环境变量
var devMode = process.env.NODE_ENV == 'development';
//设置环境变量export NODE_ENV=development

gulp.task('html',function(){
   var page = gulp.src(folder.src + 'html/*')
       .pipe(connect.reload());
       if(!devMode) {
            page.pipe(htmlClean())
       }
       page.pipe(gulp.dest(folder.dist + 'html'))
});
gulp.task('image',function(){
   gulp.src(folder.src + 'image/*')
       .pipe(iamgeMin())
       .pipe(gulp.dest(folder.dist + 'image'))
});
gulp.task('css',function(){
   var page = gulp.src(folder.src + 'css/*')
       .pipe(connect.reload())
       .pipe(less())
       .pipe(postCss([autoprefixer()]));
        if(!devMode) {
            page.pipe(cssClean())
        }
       page.pipe(gulp.dest(folder.dist + 'css'))
});
gulp.task('js',function(){
   var page = gulp.src(folder.src + 'js/*')
       .pipe(connect.reload());
       if(!devMode){
        //    page.pipe(debug())
            //    .pipe(uglify())
       }
       page.pipe(gulp.dest(folder.dist + 'js'))
});
gulp.task('server',function(){
    connect.server({
        port:'8899',
        livereload:true
})
});
//监听文件变化
gulp.task('watch',function(){
    gulp.watch(folder.src + 'html/*',['html']);
    gulp.watch(folder.src + 'css/*',['css']);
    gulp.watch(folder.src + 'js/*',['js']);
});
gulp.task('default',['html','css','js','image','server','watch']);