// cnpm install --save-dev gulp gulp-autoprefixer gulp-rename gulp-cssnano gulp-sass gulp-jshint gulp-uglify gulp-concat gulp-imagemin browser-sync  mkdirp
//npm install rimraf -g
var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'), // 处理css中浏览器兼容的前缀  
  rename = require('gulp-rename'), //重命名  
  cssnano = require('gulp-cssnano'), // css的层级压缩合并
  jshint = require('gulp-jshint'), //js检查 
  sass = require('gulp-sass'), // sass  
  uglify = require('gulp-uglify'), //js压缩
  concat = require('gulp-concat'), //合并文件  
  imagemin = require('gulp-imagemin'), //图片压缩 
  browerSync = require('browser-sync').create(),
  reload = browerSync.reload,
  Config = require('./gulpfile.config.js');
//======= gulp dev 开发环境下 ===============
function dev() {
  /**
   *  html处理
   * */
  gulp.task('html:dev', function() {
    return gulp.src(Config.html.src).pipe(gulp.dest(Config.html.dist)).pipe(reload({ stream: true }));
  });

  /**
   * assets文件夹下所有文件处理
   */
  gulp.task('assets:dev', function() {
    return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dist)).pipe(reload({ stream: true }));
  });
  /**
   * css文件处理
   */
  gulp.task('css:dev', function() {
    return gulp.src(Config.css.src).pipe(gulp.dest(Config.css.dist)).pipe(reload({ stream: true }));
  });
  /**
   * sass文件处理
   */
  gulp.task('sass:dev', function() {
    return gulp.src(Config.sass.src).pipe(sass()).pipe(gulp.dest(Config.sass.dist)).pipe(reload({ stream: true }));
  });
  /**
   * js 文件处理
   */
  gulp.task('js:dev', function() {
    return gulp.src(Config.js.src).pipe(jshint('.jshintrc')).pipe(jshint.reporter('default')).pipe(gulp.dest(Config.js.dist)).pipe(reload({ stream: true }));
  });
  /**
   * img图片处理
   */
  gulp.task('images:dev', function() {
    return gulp.src(Config.img.src).pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
    })).pipe(gulp.dest(Config.img.dist)).pipe(reload({ stream: true }));
  });

  gulp.task('dev', ['html:dev', 'css:dev', 'sass:dev', 'assets:dev', 'images:dev','js:dev'], function() {
    browerSync.init({
      server: {
        baseDir: Config.dist
      },
      notify: false
    });
    gulp.watch(Config.html.src, ['html:dev']);
    gulp.watch(Config.css.src, ['css:dev']);
    gulp.watch(Config.sass.src, ['sass:dev']);
    gulp.watch(Config.js.src, ['js:dev']);
    gulp.watch(Config.img.src, ['img:dev']);
    gulp.watch(Config.assets.src, ['assets:dev']);
  });
}
//======= gulp dev 开发环境下 ===============
module.exports = dev;