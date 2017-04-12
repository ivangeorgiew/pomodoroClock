var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    pump = require('pump');


gulp.task('css', function (cb) {
  pump([
      gulp.src('src/assets/css/main.scss'),
      sass(),
      autoprefixer('last 4 version'),
      gulp.dest('app/assets/css'),
      cssnano(),
      rename({ suffix: '.min' }),
      gulp.dest('app/assets/css'),
      browserSync.reload({stream:true})
    ],
    cb
  );
});

gulp.task('etc', function(cb) {
  pump([
      gulp.src('src/assets/beep.mp3'),
      gulp.dest('app/assets'),
      browserSync.reload({stream:true})
    ],
    cb
  );
});

gulp.task('jsConcat', function(cb){
  pump([
      gulp.src(['node_modules/hacktimer/HackTimer.min.js', 'src/assets/js/app.js']),
      concat('app.min.js'),
      gulp.dest('app/assets/js'),
      browserSync.reload({stream:true})
    ],
    cb
  );
});

gulp.task('html', function(cb){
  pump([
      gulp.src('src/index.html'),
      gulp.dest('app/'),
      browserSync.reload({stream:true})
    ],
    cb
  );
});

gulp.task('browser-sync', function() {
  browserSync.init(null, {
    server: {
      baseDir: "app"
    }
  });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['css', 'etc', 'jsConcat', 'html', 'browser-sync'], function () {
    gulp.watch("src/assets/css/*.scss", ['css']);
    gulp.watch("src/assets/js/app.js", ['jsConcat']);
    gulp.watch("src/*.html", ['html']);
    gulp.watch("app/*.html", ['bs-reload']);
});
