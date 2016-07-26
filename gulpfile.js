'use strict';

var browserSync = require('browser-sync');
var browserify  = require('browserify');
var exec        = require('child_process').execSync;
var del         = require('del');
var gulp        = require('gulp');
var cache       = require('gulp-cache');
var cssnano     = require('gulp-cssnano');
var eslint      = require('gulp-eslint');
var htmlmin     = require('gulp-htmlmin');
var gulpIf      = require('gulp-if');
var imagemin    = require('gulp-imagemin');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');
var path        = require('path');
var runSequence = require('run-sequence');
var watchify    = require('watchify');
var buffer      = require('vinyl-buffer');
var source      = require('vinyl-source-stream');

var reload    = browserSync.reload;
var bootstrap = path.join(__dirname, '/node_modules/bootstrap-sass/');
var isWatch   = false;
var isRelease = false;
var changedHugofile = '';

// hugoで開発時に出力させるbaseurl
var baseurlDev = '/';
var hugoDevCmd = 'hugo -b="' + baseurlDev + '"';
// var hugoDevCmd = 'hugo -v -b="' + baseurlDev + '"';
var gPath = {
  // gulp.srcに指定するパス 基本はappもしくはmodulesを指定する
  src: {
    // hugoで利用する
    hugo: [
      'archetypes/**/*',
      'config.toml',
      'content/**/*',
      'data/**/*',
      'layouts/**/*'
    ],
    hugoWatch: ['public/**/*'],
    // 縮小する前のhtml(hugoのhtml出力先)
    // htmlを圧縮する際に指定
    html: 'public/**/*.html',
    // 大元になるscss
    css: ['app/styles/main.scss'],
    // 変更を監視するcss
    cssWatch: ['app/styles/**/*.{scss,css}'],
    // jsのコンパイル対象を指定
    js: './app/scripts/main.js',
    // jsでlint対象を指定
    jsLint: ['app/scripts/**/*.js', 'gulpfile.js'],
    // browserify で指定するファイル名
    jsName: 'main.js',
    img: 'app/images/**/*',
    modules: [bootstrap + 'assets/fonts/**/*'],
    // app直下でdistにコピーするものを指定
    copy: ['app/*', '!app/*.html']
  },
  // 開発出力用パス 基本はhugoで監視する.tmp以下に出力する
  // html img はsrcもしくはpublic以下をそのまま利用する
  dev: {
    css: '.tmp/styles',
    js: '.tmp/scripts',
    modules: '.tmp/modules'
  },
  // 本番出力用パス
  dist: {
    html: 'dist',
    css: 'dist/styles',
    js: 'dist/scripts',
    img: 'dist/images',
    modules: 'dist/modules',
    copy: 'dist'
  },
  // cleanタスクで削除するファイルを指定
  clean: ['.tmp', 'public', 'dist/*', '!dist/.git']
};

gulp.task('watchify', function() {
  isWatch = true;
  console.log('isWatch:', isWatch);
});

gulp.task('release', function(cb) {
  isRelease = true;
  console.log('isRelease:', isRelease);
  cb();
});

gulp.task('copy', function() {
  return gulp.src(gPath.src.copy, {
    dot: true
  }).pipe(gulp.dest(gPath.dist.copy));
});

// node_modules内のassetsをコピーする
gulp.task('copy:nm', function() {
  return gulp.src(gPath.src.modules, {
    base: 'node_modules',
    dot: true
  })
  .pipe(gulpIf(isRelease,
    gulp.dest(gPath.dist.modules),
    gulp.dest(gPath.dev.modules)
  ));
});

// hugoでビルドするさせるタスク
gulp.task('hugo:build', function() {
  var cmd = gulpIf(isRelease, 'hugo', hugoDevCmd);
  exec(cmd, {
    encoding: 'utf-8',
    stdio: [0, 1, 2]
    // maxBuffer: 200*1024
  });
});

// hugoでビルド後、browserSyncが動いてればリロードする
gulp.task('hugo', ['hugo:build'], function() {
  return gulp.src(changedHugofile)
  .pipe(gulpIf(browserSync.active, reload({stream: true})));
  // .pipe(gulpIf(browserSync.active, reload));
});

gulp.task('clean', function(cb) {
  del(gPath.clean, {dot: true});
  cb();
});

gulp.task('styles', function() {
  return gulp.src(gPath.src.css)
  .pipe(gulpIf(!isRelease, sourcemaps.init()))
  .pipe(sass({
    precision: 10,
    includePaths: [
      path.join(bootstrap, 'assets/stylesheets')
    ]
  }).on('error', sass.logError))
  // .pipe(gulpIf(isRelease, minifyCss()))
  // bootstrapを利用しているのでautoprefixerはfalse
  // (ベンダープレフィックスが除去されてしまう)
  .pipe(gulpIf(isRelease, cssnano({autoprefixer: false})))
  .pipe(gulpIf(!isRelease, sourcemaps.write()))
  .pipe(gulpIf(isRelease, gulp.dest(gPath.dist.css), gulp.dest(gPath.dev.css)))
  .pipe(gulpIf(browserSync.active, reload({stream: true})));
});

gulp.task('lint', function() {
  return gulp.src(gPath.src.jsLint)
  .pipe(eslint({
    extends: 'google',
    env: {browser: true, node: true, jquery: true},
    rules: {
      'no-multi-spaces': [2, {exceptions: {
        VariableDeclarator: true,
        ImportDeclaration: true
      }}]
    }
  }))
  .pipe(eslint.format())
  .pipe(gulpIf(!browserSync.active, eslint.failOnError()));
});

gulp.task('images', function() {
  return gulp.src(gPath.src.img)
  .pipe(cache(imagemin({
    progressive: true,
    interlaced: true
  })))
  .pipe(gulp.dest(gPath.dist.img));
});

gulp.task('scripts', function() {
  var browserifyOpts = {
    entries: gPath.src.js
    // basedir: './',
  };

  var bundler = browserify(browserifyOpts);
  if (isWatch) {
    browserifyOpts.cache = {};
    browserifyOpts.packageCache = {};
    browserifyOpts.debug = true;
    bundler = watchify(browserify(browserifyOpts));
  }

  var execBundle = function() {
    var time = process.hrtime();
    return bundler
    .bundle()
    .pipe(source(gPath.src.jsName))
    .pipe(buffer())
    .pipe(gulpIf(!isRelease, sourcemaps.init({loadMaps: true})))
    .pipe(gulpIf(!isRelease, sourcemaps.write()))
    .pipe(gulpIf(isRelease, uglify({preserveComments: 'some'})))
    .on('error', function(err) {
      console.log('Bundle error:', err);
    })
    .pipe(gulpIf(!isRelease, sourcemaps.write()))
    .pipe(gulpIf(
      isRelease,
      gulp.dest(gPath.dist.js),
      gulp.dest(gPath.dev.js)
    ))
    .on('end', function() {
      console.log('Bundled[ s, ns ]:', process.hrtime(time));
    })
    // .pipe(gulpIf(browserSync.active, browserSync.stream({once: true})));
    .pipe(gulpIf(browserSync.active, reload({stream: true})));
  };
  bundler.on('update', execBundle);
  return execBundle();
});

gulp.task('scripts:watch', function(cb) {
  runSequence('watchify', 'scripts', cb);
});

gulp.task('html', function() {
  return gulp.src(gPath.src.html)
  .pipe(htmlmin({
    // removeComments: true,
    removeComments: false,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeOptionalTags: true
  }))
  .pipe(gulp.dest(gPath.dist.html));
});

// サーバーを起動せずにhtml, css, js開発
gulp.task('watch', ['copy:nm', 'scripts:watch', 'styles'], function() {
  gulp.watch(gPath.src.cssWatch, ['styles']);
  gulp.watch(gPath.src.jsLint, ['lint']);
  var hugoWatcher = gulp.watch(gPath.src.hugo, ['hugo']);
  hugoWatcher.on('change', function(evt) {
    changedHugofile = evt.path;
  });
});

// サーバーを起動して開発
gulp.task('serve', ['copy:nm', 'scripts:watch', 'styles', 'hugo'], function() {
  browserSync({
    notify: false,
    // scrollElementMapping: ['main', '.mdl-layout'],
    // https: true,
    server: ['public', '.tmp', 'app'],
    port: 3000
  });

  gulp.watch(gPath.src.cssWatch, ['styles']);
  gulp.watch(gPath.src.jsLint, ['lint']);
  gulp.watch(gPath.src.img, reload);
  var hugoWatcher = gulp.watch(gPath.src.hugo, ['hugo']);
  hugoWatcher.on('change', function(evt) {
    changedHugofile = evt.path;
  });
});

// 本番資産の確認
gulp.task('serve:dist', ['default'], function() {
  browserSync({
    notify: false,
    // scrollElementMapping: ['main', '.mdl-layout'],
    // https: true,
    server: 'dist',
    port: 3001
  });
});

gulp.task('default', ['clean', 'release'], function(cb) {
  runSequence(
    ['styles', 'hugo'],
    ['lint', 'html', 'scripts', 'images', 'copy', 'copy:nm'],
    cb
  );
});
