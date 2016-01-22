var gulp = require('gulp');

var browserify = require('browserify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('js', function(){
    var modules = [
      "signup"
    ]
    for (var i = 0; i < modules.length; i++){
      var mod = modules[i]
      browserify('./public/js/src/'+ mod +'/'+ mod +'.jsx')
          .transform(reactify)
          .bundle()
          .pipe(source(mod + '.js'))
          .pipe(buffer())
          .pipe(uglify())
          .pipe(gulp.dest('public/js/build/'));
    }
});

gulp.task('watch', function() {
    gulp.watch("public/js/src/**/*.jsx", ["js"])
})

gulp.task('default', ['js', 'watch']);
