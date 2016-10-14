'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';
import {stream as wiredep} from 'wiredep';
import download from 'gulp-download';
import decompress from 'gulp-decompress';
import rename from 'gulp-rename';

const $ = gulpLoadPlugins();

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/scripts.babel',
    '!app/*.json',
    '!app/*.html',
  ], {
    base: 'app',
    dot: true,
  }).pipe(gulp.dest('dist'));
});

gulp.task('font-awesome', () => {
  return gulp.src([
    'app/bower_components/components-font-awesome/**'
  ]).pipe(gulp.dest('dist/bower_components/components-font-awesome'));
});

gulp.task('assets', () => {
  return gulp.src([
    'utils/**/*.js',
    'utils/**/*.css',
  ], {
    dot: true,
  }).pipe(gulp.dest('app/utils'));
});

gulp.task('web-assets', () => {
  return gulp.src([
    'utils/**/*.js',
    'utils/**/*.css',
  ], {
    dot: true,
  }).pipe(gulp.dest('web/public'));
});

gulp.task('web-font-awesome', () => {
  return gulp.src([
    'app/bower_components/components-font-awesome/**'
  ]).pipe(gulp.dest('web/public/bower_components/components-font-awesome'));
});

gulp.task('favicon', () => {
  return gulp.src([
    'app/images/icon-38.png',
  ], {
    dot: true,
  })
  .pipe(rename('favicon.png'))
  .pipe(gulp.dest('web/public'));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe($.eslint(options))
      .pipe($.eslint.format());
  };
}

gulp.task('lint', lint('app/scripts.babel/**/*.js', {
  env: {
    es6: true
  }
}));

gulp.task('lang', () => {
  return download('https://localise.biz:443/api/export/archive/json.zip?' +
    'key=dabd2dcd5915b93046701058e3a44a6c&format=chrome')
    .pipe(decompress({strip: 1}))
    .pipe(gulp.dest('dist'));
});

gulp.task('lang-web', () => {
  return download('https://localise.biz:443/api/export/archive/json.zip?' +
    'key=dabd2dcd5915b93046701058e3a44a6c&format=chrome')
    .pipe(decompress({strip: 1}))
    .pipe(gulp.dest('web'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // Don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{ cleanupIDs: false }],
    }))
    .on('error', function(err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('html',  () => {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.sourcemaps.init())
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cleanCss({compatibility: '*'})))
    .pipe($.sourcemaps.write())
    .pipe($.if('*.html', $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
    })))
    .pipe(gulp.dest('dist'));
});

gulp.task('chromeManifest', () => {
  return gulp.src('app/manifest.json')
    .pipe($.chromeManifest({
      background: {
        target: 'scripts/background.js',
        exclude: [
          'scripts/chromereload.js'
        ],
      },
    }))
  .pipe($.if('*.css', $.cleanCss({compatibility: '*'})))
  .pipe($.if('*.js', $.sourcemaps.init()))
  .pipe($.if('*.js', $.uglify()))
  .pipe($.if('*.js', $.sourcemaps.write('.')))
  .pipe(gulp.dest('dist'));
});

gulp.task('babel', () => {
  return gulp.src('app/scripts.babel/**/*.js')
      .pipe($.babel({
        presets: ['es2015']
      }))
      .pipe(gulp.dest('app/scripts'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('watch', ['lint', 'babel', 'html'], () => {
  $.livereload.listen();

  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    'app/styles/**/*',
  ]).on('change', $.livereload.reload);

  gulp.watch('app/scripts.babel/**/*.js', ['lint', 'babel']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('size', () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('wiredep', () => {
  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('package', function() {
  var manifest = require('./dist/manifest.json');
  return gulp.src('dist/**')
      .pipe($.zip('look-provisu-' + manifest.version + '.zip'))
      .pipe(gulp.dest('package'));
});

gulp.task('build', (cb) => {
  runSequence(
    'lint', 'babel', 'assets', 'lang', 'font-awesome', 'chromeManifest',
    ['html', 'images', 'extras'],
    'size', cb);
});

gulp.task('server', (cb) => {
  $.express.run(['web/bin/www']);
});

gulp.task('build-web', (cb) => {
  runSequence('web-assets', 'lang-web',
    'favicon', 'web-font-awesome', cb);
});

gulp.task('doc', function() {
  return gulp.src('doc/provisu.md')
      .pipe($.markdownPdf())
      .pipe(gulp.dest('doc'));
});

gulp.task('default', ['clean'], cb => {
  runSequence('build', cb);
});
