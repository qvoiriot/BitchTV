var gulp = require("gulp");
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var bowerFiles = require('main-bower-files');
var es = require('event-stream');
var clean = require('gulp-clean');
var concatCss = require('gulp-concat-css');
var minifyCSS = require('gulp-minify-css');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var size = require('gulp-size');
var ngAnnotate = require('gulp-ng-annotate');
var reload = browserSync.reload;

var port = 8002;
var environment = process.env.ENVIRONMENT || 'LOCAL';

var paths = {
    appScripts: ["app/**/*.js", "!app/**/*Spec.js"],
    //specify order, bug if put randomly
    vendorScripts: ["build/lib/jquery.js", "build/lib/angular.js", "build/lib/**/*.js"],
    vendorFonts: ["build/lib/**/*.eot", "build/lib/**/*.svg", "build/lib/**/*.ttf", "build/lib/**/*.woff", "build/lib/**/*.woff2"],
    appFonts: ["app/fonts/**/*"],
    appCss: "app/**/*.css",
    vendorCss: ["build/lib/**/*.css"]
};

specifyConfig(paths.appScripts, environment);

//TODO temporary workaround, because this font is not in the main bower files
paths.vendorFonts.push("bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2");

gulp.task("default", function(callback) {
    runSequence("build", ["serve", "watch"], callback);
});

//Deploy bower files
gulp.task("bower", ["bower-files", "vendor", "clean"]);

//build everything
gulp.task("build:web", ["js:app", "bower" , "css:app", "copy", "fonts:app"]);

gulp.task("build:mobile", ["build:web"], function() {
    return gulp.src('dist/**').pipe(gulp.dest('mobile/www'));
});

gulp.task("build", ["build:web" , "build:mobile"]);

//Minify app js files
gulp.task("js:app", function() {
    return gulp.src(paths.appScripts)
        .pipe(ngAnnotate())
        .pipe(concat("app.min.js"))
        .pipe(gulpif(environment == 'PROD', uglify()))
        .pipe(size())
        .pipe(gulp.dest("dist/js"))
});

//Minify and concat every css from app into app.css
gulp.task("css:app", function() {
    return gulp.src(paths.appCss)
        .pipe(concatCss("app.min.css"))
        .pipe(minifyCSS({keepSpecialComments: 0}))
        .pipe(gulp.dest("dist/css"));
});

//Minify js files from bower into one vendor.js
gulp.task("js:vendor", ['bower-files'], function() {
    return gulp.src(paths.vendorScripts)
        .pipe(concat("vendor.min.js"))
        .pipe(gulpif(environment == 'PROD', uglify()))
        .pipe(size())
        .pipe(gulp.dest("dist/js"))
});

//Same for css files
gulp.task("css:vendor", ["bower-files"], function() {
    return gulp.src(paths.vendorCss)
        .pipe(concatCss("vendor.min.css"))
        .pipe(minifyCSS())
        .pipe(gulp.dest("dist/css"));
});

//Copy the vendor fonts in the public css folder (bootstrap needs it)
gulp.task("fonts:vendor", ["bower-files"], function() {
    return gulp.src(paths.vendorFonts).pipe(gulp.dest("dist/fonts"));
});

gulp.task("fonts:app", ["bower-files"], function() {
    return gulp.src(paths.appFonts).pipe(gulp.dest("dist/fonts"));
});

//Vendor stuff (bower)
gulp.task("vendor", ["js:vendor", "css:vendor", "fonts:vendor"]);

//Take the main files from bower_components and put them into build
gulp.task("bower-files", function(){
    return gulp.src(bowerFiles()).pipe(gulp.dest("build/lib"));
});

//Clean the build folder when the vendor stuff is finished
gulp.task("clean", ["vendor"], function() {
    return gulp.src("build").pipe(clean());
});

//Copy other stuff to public (img, html, etc.)
gulp.task("copy", function() {
    return es.merge(
        gulp.src("app/**/*.html").pipe(gulp.dest("dist")),
        gulp.src("app/assets/**").pipe(gulp.dest("dist/assets")),
        gulp.src("app/api/**/*.json").pipe(gulp.dest("dist/api")),
        gulp.src("favicon.ico").pipe(gulp.dest("dist"))
    );
});

//Execute the server
gulp.task("serve", function() {
    return browserSync({
        notify: false,
        server: {
            baseDir: ['dist']
        },
        port: port
    });
});

//Here don't watch, assets: too much
gulp.task("watch", function() {
    gulp.watch(paths.appCss, ["css:app", reload]);
    gulp.watch(paths.appScripts, ["js:app", reload]);
    gulp.watch(["app/**/*.html"], ["copy", reload]);
});

function specifyConfig(appScripts, environment) {
    var environments = ['LOCAL', 'DEV', 'PROD'];
    for(var i=0; i<environments.length; i++) {
        if(environment != environments[i]) {
            appScripts.push('!app/config/' + environments[i].toLowerCase() + '.js');
        }
    }
}