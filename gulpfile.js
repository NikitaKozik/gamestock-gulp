const fileinclude = require('gulp-file-include');

let projectFolder = 'dist';
let projectSource = '#src';

let path = {
    build: {
        html: projectFolder + '/',
        css: projectFolder + '/css/',
        js: projectFolder + '/js/',
        images: projectFolder + '/images/'
    },

    src: {
        html: [projectSource + '/*.html', '!' + projectSource + '/_*.html'],
        css: [projectSource + '/css/style.scss'],
        js: projectSource + '/js/main.js',
        images: projectSource + '/images/**/*.{jpg,png,svg,gif,ico,webp}'
    },

    watch: {
        html: projectSource + '/**/*.html',
        css: projectSource + '/css/**/*.scss',
        js: projectSource + '/js/**/*.js',
        images: projectSource + '/images/**/*.{jpg,png,svg,gif,ico,webp}'
    },
    
    clean: './' + projectFolder + '/'
};

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(), //Отображение измений в живом режимеnpm
    del = require('del'), //Удалять "черные" файлы при компиляции
    scss = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'), //Автопрефикс
    groupMediaQueries = require('gulp-group-css-media-queries'), //Групирует медиа-запросы
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin'),
    wait = require('gulp-wait');


function browserSync(params) {
    browsersync.init({
        server:{
            baseDir: './' + projectFolder + '/'
        },
        port:3000,
        notify: false
    });
}

function images() {
    return src(path.src.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3
        })
        )
        .pipe(dest(path.build.images))
        .pipe(browsersync.stream());
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: '.min.js'
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function css() {
    return src(path.src.css)
    .pipe(wait(200))
    .pipe(
        scss({
            outputStyle: 'expanded'
        })
    )
    .pipe(
        groupMediaQueries()
    )
    .pipe(
        autoprefix({
            cascade: true,
            overrideBrowserslist: ['last 5 versions']
        })
    )
    .pipe(dest(path.build.css))
    .pipe(cleanCSS())
    .pipe(
        rename({
            extname: '.min.css'
        })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.images], images);
}

function clean(params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;