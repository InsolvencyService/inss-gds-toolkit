/// <binding BeforeBuild='buildApp' />
var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

var sccsAppPaths = ['./INSS.Scripts/scss/inss-app/**/*.scss'];
var jsAppPaths = [
    './INSS.Scripts/js/inss-app/gds-error-summary.js'
];
var sccsGDSPaths = ['./scss/**/*.scss'];
var baseNameForApp = 'inss-app';
var baseNameForGDS = 'inss-gds-toolkit';
var cssOutputPathForApp = 'wwwroot/css';
var jsOutputPathForApp = 'wwwroot/js';
var outputPathForGDS = 'wwwroot/' + baseNameForGDS;
var cssOutputPathForGDS = outputPathForGDS + '/css';
var jsOutputPathForGDS = outputPathForGDS + '/js';
var assetsPathForGDS = '"/' + baseNameForGDS + '/assets/';
var nodeRootPath = './node_modules/govuk-frontend/govuk';
 
function buildAppCss() {
    return buildCss(sccsAppPaths, baseNameForApp, cssOutputPathForApp);
}

function buildCss(src, baseName, outputPath) {
    return gulp.src(src)
        .pipe(concat(baseName + '.css'))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer({
            browsers: [
                'Chrome >= 35',
                'Firefox >= 38',
                'Edge >= 12',
                'Explorer >= 10',
                'iOS >= 8',
                'Safari >= 8',
                'Android 2.3',
                'Android >= 4',
                'Opera >= 12']
        })]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(outputPath))
        .pipe(cleanCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(outputPath));
}

function buildAppJs() {
    return buildJs(jsAppPaths, baseNameForApp, jsOutputPathForApp);
}

function buildJs(jsPaths, baseName, outputPath) {
    return gulp.src(jsPaths)
        .pipe(concat(baseName + '.js'))
        .pipe(gulp.dest(outputPath))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(outputPath));
}

function buildGDSCss() {
    return gulp.src(sccsGDSPaths)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: 'node_modules'
        }))
        .pipe(replace('"/assets/', assetsPathForGDS))
        .pipe(postcss([autoprefixer({
            browsers: [
                'Chrome >= 35',
                'Firefox >= 38',
                'Edge >= 12',
                'Explorer >= 10',
                'iOS >= 8',
                'Safari >= 8',
                'Android 2.3',
                'Android >= 4',
                'Opera >= 12']
        })]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssOutputPathForGDS))
        .pipe(cleanCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(cssOutputPathForGDS));
}

function buildGDSJs() {
    return buildJs([nodeRootPath + '/all.js'], baseNameForGDS, jsOutputPathForGDS);
}

function copyGDSAssets() {
    return gulp.src([nodeRootPath + '/assets/**/*'])
        .pipe(gulp.dest(outputPathForGDS + '/assets/'));
}

function watcher() {
    gulp.watch([sccsGDSPath], gulp.series(buildCss));
}

exports.watch = gulp.series(buildAppCss, buildGDSCss, watcher);
exports.default = gulp.series(buildAppCss, buildAppJs, buildGDSCss, buildGDSJs, copyGDSAssets);
exports.buildApp = gulp.series(buildAppCss, buildAppJs);
exports.buildGDS = gulp.series(buildGDSCss, buildGDSJs, copyGDSAssets);
exports.buildAppCss = gulp.series(buildAppCss);
exports.buildAppJs = gulp.series(buildAppJs);
exports.buildGDSCss = gulp.series(buildGDSCss);
exports.buildGDSJs = gulp.series(buildGDSJs);
exports.copyGDSAssets = gulp.series(copyGDSAssets);
