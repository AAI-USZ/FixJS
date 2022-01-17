function(src, options, globals, extraMsg) {
    // JSHint sometimes modifies objects you pass in, so clone them.
    options = options ? grunt.util._.clone(options) : {};
    globals = globals ? grunt.util._.clone(globals) : {};
    // Enable/disable debugging if option explicitly set.
    if (grunt.option('debug') !== undefined) {
      options.devel = options.debug = grunt.option('debug');
      // Tweak a few things.
      if (grunt.option('debug')) {
        options.maxerr = Infinity;
      }
    }
    var msg = 'Linting' + (extraMsg ? ' ' + extraMsg : '') + '...';
    grunt.verbose.write(msg);
    // Tab size as reported by JSHint.
    var tabstr = getTabStr(options);
    var placeholderregex = new RegExp(tabstr, 'g');
    // Lint.
    var result = jshint(src, options || {}, globals || {});
    var data = jshint.data();
    // Attempt to work around JSHint erroneously reporting bugs.
    // if (!result) {
    //   // Filter out errors that shouldn't be reported.
    //   jshint.errors = jshint.errors.filter(function(o) {
    //     return o && o.something === 'something';
    //   });
    //   // If no errors are left, JSHint actually succeeded.
    //   result = jshint.errors.length === 0;
    // }
    if (result && !data.unused) {
      // Success!
      grunt.verbose.ok();
      return;
    }
    // Something went wrong.
    grunt.verbose.or.write(msg);
    grunt.log.error();
    // Iterate over all unused variables
    var varsByLine = {};
    if (data.unused) {
      data.unused.forEach(function(unused) {
        var line = unused.line;
        var vars = varsByLine[line] = varsByLine[line] || [];
        vars.push(unused.name);
      });
      Object.keys(varsByLine).forEach(function(line) {
        // Manually increment errorcount since we're not using grunt.log.error().
        grunt.fail.errorcount++;
        var vars = varsByLine[line];
        grunt.log.writeln('['.red + ('L' + line).yellow + ']'.red +
          (' Unused variable' + (vars.length === 1 ? '' : 's') + ': ').yellow +
          grunt.log.wordlist(vars, {color: false, separator: ', '.yellow}));
      });
    }
    // Iterate over all errors.
    jshint.errors.forEach(function(e) {
      // Sometimes there's no error object.
      if (!e) { return; }
      var pos;
      var evidence = e.evidence;
      var character = e.character;
      if (evidence) {
        // Manually increment errorcount since we're not using grunt.log.error().
        grunt.fail.errorcount++;
        // Descriptive code error.
        pos = '['.red + ('L' + e.line).yellow + ':'.red + ('C' + character).yellow + ']'.red;
        grunt.log.writeln(pos + ' ' + e.reason.yellow);
        // If necessary, eplace each tab char with something that can be
        // swapped out later.
        if (tabstr) {
          evidence = evidence.replace(tabregex, tabstr);
        }
        if (character === 0) {
          // Beginning of line.
          evidence = '?'.inverse.red + evidence;
        } else if (character > evidence.length) {
          // End of line.
          evidence = evidence + ' '.inverse.red;
        } else {
          // Middle of line.
          evidence = evidence.slice(0, character - 1) + evidence[character - 1].inverse.red +
            evidence.slice(character);
        }
        // Replace tab placeholder (or tabs) but with a 2-space soft tab.
        evidence = evidence.replace(tabstr ? placeholderregex : tabregex, '  ');
        grunt.log.writeln(evidence);
      } else {
        // Generic "Whoops, too many errors" error.
        grunt.log.error(e.reason);
      }
    });
    grunt.log.writeln();
  }