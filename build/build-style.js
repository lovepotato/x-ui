const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

// 编译less
gulp.task('css', function () {
    gulp.src('../src/index.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie > 8']
        }))
        .pipe(cleanCSS())
        .pipe(rename('gf.css'))
        .pipe(gulp.dest('../lib/styles'));
});

// 拷贝字体文件
gulp.task('fonts', function () {
    gulp.src('../src/style/common/iconfont/fonts/*.*')
        .pipe(gulp.dest('../lib/styles/fonts'));
});

gulp.task('default', ['css', 'fonts']);