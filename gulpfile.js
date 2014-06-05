var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var component = require('gulp-component');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var prettify = require('gulp-prettify');
var imagemin = require('gulp-imagemin');
var nib = require('nib');
process.on("uncaughtException",function(err){
    console.log(err,err.stack);
});

gulp.task('connect',function(){
    connect.server({
        port: 1234,
        livereload: true
    });
});

gulp.task('image',function(){
    gulp.src(['./img/*'])
        .pipe(imagemin())
        .pipe(gulp.dest("./img/"));
})


gulp.task('stylus', function(){
    var stylusOptions = {
        use: [nib()],
        import : ["nib"]
    };
    gulp.src(["css/**/*.styl"])
        .pipe(stylus(stylusOptions))
        .on("error",console.log)
        .pipe(gulp.dest('./css/'));
});

gulp.task('jade', function(){
    var source = gulp.src(["./jade/**/*.jade","!./jade/*layout.jade"])
        .pipe(jade())
        .pipe(prettify({indentSize:4}))
        .pipe(gulp.dest("html/"))
        .pipe(connect.reload());

    function change_name(source,name){
        source.pipe(rename({
            basename: name
        }))
        .pipe(gulp.dest("html/"))
    }
});


gulp.task('watch', function () {
  gulp.watch(["./jade/**/*.jade"], ['jade']);
  gulp.watch(["./css/**/*.styl"], ['stylus']);
});

gulp.task('default', ['stylus','jade','watch','connect']);
