// cnpm install --save-dev gulp gulp-autoprefixer gulp-rename gulp-cssnano gulp-sass gulp-jshint jshint gulp-uglify gulp-concat gulp-imagemin browser-sync mkdirp
//npm install rimraf -g
var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'), // 处理css中浏览器兼容的前缀  
  rename = require('gulp-rename'), //重命名  
  cssnano = require('gulp-cssnano'), //css文件压缩  
  jshint = require('gulp-jshint'), //js检查 
  sass = require('gulp-sass'), //sass
  uglify = require('gulp-uglify'), //js压缩
  concat = require('gulp-concat'), //合并文件  
  imagemin = require('gulp-imagemin'), //图片压缩 
  Config = require('./gulpfile.config.js');

//======= gulp build 打包资源 ===============
function prod() {
  /**
   * html处理
   */
  gulp.task('html', function() {
    return gulp.src(Config.html.src).pipe(gulp.dest(Config.html.dist));
  });
  /**
   * assets处理
   */
  gulp.task('assets', function() {
    return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dist));
  });
  /**
   * CSS样式处理 
   */
  gulp.task('css', function() {
    return gulp.src(Config.css.src).pipe(autoprefixer('last 2 version')).pipe(gulp.dest(Config.css.dist)).pipe(rename({ suffix: '.min' })).pipe(cssnano()).pipe(gulp.dest(Config.css.dist));
  });
  /**
   * sass处理
   */
  gulp.task('sass', function() {
    return gulp.src(Config.sass.src).pipe(autoprefixer('last 2 version')).pipe(sass()).pipe(rename({ suffix: '.min' })).pipe(cssnano()).pipe(gulp.dest(Config.sass.dist));
  });

  /**
   * js处理
   */
  gulp.task('js', function() {
    return gulp.src(Config.js.src).pipe(jshint('.jshintrc')).pipe(jshint.reporter('default')).pipe(rename({ suffix: '.min' })).pipe(uglify()).pipe(gulp.dest(Config.js.dist));
  });
  /**
   * js合并
   */
  gulp.task('js-concat', function() {
    return gulp.src(Config.js.src).pipe(jshint('.jshintrc')).pipe(jshint.reporter('default')).pipe(concat(Config.js.build_name)).pipe(gulp.dest(Config.js.dist)).pipe(rename({ suffix: '.min' }))
      .pipe(uglify()).pipe(gulp.dest(Config.js.dist));
  });
  /**
   * 图片处理
   */
  gulp.task('images', function() {
    return gulp.src(Config.img.src).pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })).pipe(gulp.dest(Config.img.dist));
  });

  gulp.task('build', ['html', 'assets', 'css', 'sass', 'js', 'images','js-concat']);
};
module.exports = prod;