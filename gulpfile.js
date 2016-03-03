/**
 * Created by numminorihsf on 29.07.15.
 */

var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', function(){
  gulp.src([
    'src/**/*.js'
  ], {base:'src'})
    .pipe(babel({
      presets: ['react']
    }))
    .pipe(gulp.dest('./'))
});

