'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';
import {stream as wiredep} from 'wiredep';
import download from 'gulp-download';
import decompress from 'gulp-decompress';
import rename from 'gulp-rename';
import jshint from 'gulp-jshint';
import webserver from 'gulp-webserver';
import symlink from 'gulp-sym';
import replace from 'gulp-replace';
import concat from 'gulp-concat';
import jsonTransform from 'gulp-json-transform';
import uglify from 'gulp-uglify';
import fs from 'fs';
import cssmin from 'gulp-cssmin';

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
  })
  .pipe(replace('hon-provisu-options', 'hon-provisu-options-extension'))
  .pipe(gulp.dest('app/utils'));
});

gulp.task('web-assets', () => {
  return gulp.src([
    'utils/**/*.js',
    'utils/**/*.css',
  ], {
    dot: true,
  })
  .pipe(replace('hon-provisu-options', 'hon-provisu-options-service'))
  .pipe(gulp.dest('web/public'));
});

gulp.task('web-bower', () => {
  return gulp.src([
    'app/bower_components/**',
    '!app/bower_components/chai/**',
    '!app/bower_components/mocha/',
  ]).pipe(gulp.dest('web/public/bower_components'));
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

gulp.task('lint-web', lint(['web/**/*.js', '!web/public/**/*.js'], {
  env: {
    es6: true
  }
}));

gulp.task('jshint', () => {
  return gulp.src('app/scripts.babel/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jshint-web', () => {
  return gulp.src(['web/**/*.js', '!web/public/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

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

gulp.task('lang-toolbar', () => {
  return download('https://localise.biz:443/api/export/archive/json.zip?' +
    'key=dabd2dcd5915b93046701058e3a44a6c&format=chrome')
    .pipe(decompress({strip: 1}))
    .pipe(gulp.dest('toolbar/dist'));
});

gulp.task('json-toolbar', () => {
  return gulp.src('./toolbar/dist/_locales/**/*.json')
    .pipe(jsonTransform(function(data, file) {
      return '"' + file.relative.slice(0,2) + '":' +
        JSON.stringify(data) + ',';
    }))
    .pipe(concat('languages.js'))
    .pipe(replace(/^([^]*)$/gmi, 'element.json = {$1};'))
    .pipe(gulp.dest('./toolbar/dist'));
});

gulp.task('minify-css-toolbar', () => {
  return gulp.src('./toolbar/toolbar.css')
    .pipe(cssmin())
    .pipe(gulp.dest('./toolbar/dist'));
});

gulp.task('reduce-toolbar', () => {
  return gulp.src('toolbar/toolbar.js')
    .pipe(replace(
      'element.json = {}',
      fs.readFileSync('./toolbar/dist/languages.js'
    )))
    .pipe(replace(
      'INSERT_TOOLBAR_CSS',
      fs.readFileSync('./toolbar/dist/toolbar.css'
    )))
    .pipe(uglify())
    .pipe(gulp.dest('./toolbar/dist'));
});

gulp.task('clean-toolbar', () => {
  return del('toolbar/dist');
});

gulp.task('clean-toolbar-dist', () => {
  return del([
    'toolbar/dist/_locales', 'toolbar/dist/README.txt',
    'toolbar/dist/toolbar.css', 'toolbar/dist/languages.js',
  ]);
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
      .pipe($.zip('provisu-look-' + manifest.version + '.zip'))
      .pipe(gulp.dest('package'))
      .pipe(symlink('package/provisu-look-latest.zip', { force: true }));
});

gulp.task('build', (cb) => {
  runSequence(
    'lint','jshint', 'babel', 'assets', 'lang', 'font-awesome',
    'chromeManifest',
    ['html', 'images', 'extras'],
    'size', cb);
});

gulp.task('server', (cb) => {
  $.express.run(['web/bin/www']);
});

gulp.task('build-web', (cb) => {
  runSequence('lint-web','jshint-web','web-assets', 'lang-web',
    'favicon', 'web-bower', cb);
});

gulp.task('build-toolbar', (cb) => {
  runSequence(
    'clean-toolbar', 'lang-toolbar', 'json-toolbar',
    'minify-css-toolbar', 'reduce-toolbar', 'clean-toolbar-dist'
  );
});

gulp.task('serve-toolbar', (cb) => {
  gulp.src('toolbar')
    .pipe(webserver({
      livereload: true,
      fallback: 'test.html',
    }));
});

gulp.task('doc', function() {
  return gulp.src('doc/provisu.md')
      .pipe($.markdownPdf())
      .pipe(gulp.dest('doc'));
});

gulp.task('default', ['clean'], cb => {
  runSequence('build', cb);
});
