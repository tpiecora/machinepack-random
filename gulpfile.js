/**
 * Created by michaelpiecora on 5/30/15.
 */
var coveralls = require('gulp-coveralls');

gulp.task('coveralls', function () {
  return gulp.src('./path/to/lcov/file.lcov')
    .pipe(coveralls());
});
