module.exports = function(grunt) {
  'use strict';


// Require Istanbul, this way we can use it in our Grunt task
  var istanbul = require('istanbul');

// This is the reason we needed a modified version of grunt-mocha. The
// modification calls this method and passes on the information we need for
// Istanbul to do its work
  grunt.event.on('coverage', function (coverage) {
    // Write the data we received to the coverage property of the coverage task
    grunt.config('coverage.coverage', coverage);
  });

// Here we define the coverage task, it will have two targets: instrument and report
  grunt.registerMultiTask('coverage', 'Generates coverage reports for JS using Istanbul', function () {
    switch(this.target) {
      case 'instrument':
        // In the target configuration it is possible to exclude certain files like
        // third party libraries
        var ignore = this.data.ignore || [];
        // Create a new instrumenter
        var instrumenter = new istanbul.Instrumenter();
        // In the target configuration you need to specify the files to cover, here
        // we will loop over all the files
        this.files.forEach(function (file) {
          // 1: Get the filename for the current file
          // 2: Read the file from disk, even if it might be a file we instructed
          //    Istanbul to ignore. It will still get written to the output folder
          var filename = file.src[0],                     /* [1] */
            instrumented = grunt.file.read(filename);   /* [2] */
          // Only instrument this file if it is not in ignored list
          if (!grunt.file.isMatch(ignore, filename)) {
            // Instruct the instrumenter to work its magic on the file
            instrumented = instrumenter.instrumentSync(instrumented, filename);
          }
          // Write the file to its destination
          grunt.file.write(file.dest, instrumented);
        });
        break;
      case 'report':
        // We need config property coverage.coverage to be present, if it is not
        // present this will fail the task
        this.requiresConfig('coverage.coverage');

        // 1: In the target configuration you can set the reporters to use when
        //    generating the report.
        // 2: In the target configuration you can set the folder in which the
        //    report(s) will be stored.
        var Report = istanbul.Report,
          Collector = istanbul.Collector,
          reporters = this.data.reports,    /* [1] */
          dest = this.data.dest,            /* [2] */
          collector = new Collector();

        // Fetch the coverage object we saved earlier
        collector.add(grunt.config('coverage.coverage'));

        // Iterate over all reporters
        reporters.forEach(function (reporter) {
          // Create a report at the specified location for the current reports
          Report.create(reporter, {
            dir: dest + '/' + reporter
          }).writeReport(collector, true);
        });
        break;
      default:
        // The target is neither instrument nor report, display a friendly warning message
        grunt.warn('The target "' + this.target + '" is an invalid target. Valid targets are "instrument" and "report"');
        break;
    }
  });
};
