/* jshint node: true, esversion: 6 */

"use strict";

const path =        require("path");
const fs =          require("fs");

const g =           require("gulp");
const gp =          require("gulp-load-plugins")(g);
const vueify =      require("vueify");
const browserify =  require("browserify");

const src =         g.src.bind(g);
const dest =        g.dest.bind(g);
const watch =       g.watch.bind(g);
const task =        g.task.bind(g);

const paths = {
    dist: 'dist',
    comps: 'src/**/*.vue',
    index: "src/index.jade",
    app: "src/app.js",
    js: "src/**/*.js",
    bundle: "dist/bundle.js"
};

const defaultTasks = [
    "vueify",
    "index",
    "watch",
    "serve"
];

task("default", defaultTasks);

task('vueify', vueifyStuff);
task('watch', watchStuff);
task('index', index);
task('serve', ["vueify"], serve);

function vueifyStuff () {
    browserify(paths.app)
    .transform(vueify)
    .bundle()
    .pipe(fs.createWriteStream(paths.bundle));
}

function watchStuff () {
    watch([paths.app, paths.comps, paths.js], ["vueify"]);
    watch(paths.index, ["index"]);
}

function index () {
    src(paths.index)
    .pipe(gp.jade())
    .pipe(dest(paths.dist));
}

function serve () {
   gp.connect.server({
        port: process.env.PORT || 3000,
        root: paths.dist
    });
}
