//gulp.js configuration 

//modules
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


//sass processing
//when sass is run, compoiles the sass code into the css folder. 
gulp.task('sass', function(){
    return gulp.src('scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});


//browser syncing
//creates a task called serve that creates a server at root ./ then uses gulp.watch to watch the sass file to call sass if any changes
//All html files. reloads browsers if html is updated
gulp.task('serve', ['sass'], function(){


    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./scss/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./*.js").on('change', browserSync.reload);
});

//when gulp is run at command line within the project, call the serve task by default so you don't have to call serve explicitly
gulp.task('default', ['serve']);