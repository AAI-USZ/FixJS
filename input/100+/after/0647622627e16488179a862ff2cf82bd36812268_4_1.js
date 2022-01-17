function() {
    // Extra arguments will be applied to the template file.
    var args = grunt.utils.toArray(arguments);
    // Template name.
    var name = args.shift();
    // Default to last-specified grunt.npmTasks plugin name if template name
    // was omitted. Note that specifying just a : after init like "grunt init:"
    // will allow all available templates to be listed.
    if (name == null) {
      name = grunt._npmTasks[grunt._npmTasks.length - 1];
    }
    // Valid init templates (.js or .coffee files).
    var templates = {};
    grunt.task.expandFiles('init/*.{js,coffee}').forEach(function(fileobj) {
      // Add template (plus its path) to the templates object.
      var basename = path.basename(fileobj.abs).replace(/\.(?:js|coffee)/, '');
      templates[basename] = require(fileobj.abs);
    });
    var initTemplate = templates[name];

    // Give the user a little help.
    grunt.log.writelns(
      'This task will create one or more files in the current directory, ' +
      'based on the environment and the answers to a few questions. ' +
      'Note that answering "?" to any question will show question-specific ' +
      'help and answering "none" to most questions will leave its value blank.'
    );

    // Abort if a valid template was not specified.
    if (!initTemplate) {
      grunt.log.writeln().write('Loading' + (name ? ' "' + name + '"' : '') + ' init template...').error();
      grunt.log.errorlns('A valid template name must be specified, eg. "grunt ' +
        'init:commonjs". The currently-available init templates are: ');
      Object.keys(templates).forEach(function(name) {
        var description = templates[name].description || '(no description)';
        grunt.log.errorlns(name.cyan + ' - ' + description);
      });
      return false;
    }

    // Abort if matching files or directories were found (to avoid accidentally
    // nuking them).
    if (initTemplate.warnOn && grunt.file.expand(initTemplate.warnOn).length > 0) {
      grunt.log.writeln();
      grunt.warn('Existing files may be overwritten!');
    }

    // This task is asynchronous.
    var taskDone = this.async();

    var pathPrefix = 'init/' + name + '/root/';

    // Useful init sub-task-specific utilities.
    var init = {
      // Expose any user-specified default init values.
      defaults: grunt.task.readDefaults('init/defaults.json'),
      // Expose rename rules for this template.
      renames: grunt.task.readDefaults('init', name, 'rename.json'),
      // Return an object containing files to copy with their absolute source path
      // and relative destination path, renamed (or omitted) according to rules in
      // rename.json (if it exists).
      filesToCopy: function(props) {
        var files = {};
        // Iterate over all source files.
        grunt.task.expandFiles({dot: true}, pathPrefix + '**').forEach(function(obj) {
          // Get the path relative to the template root.
          var relpath = obj.rel.slice(pathPrefix.length);
          var rule = init.renames[relpath];
          // Omit files that have an empty / false rule value.
          if (!rule && relpath in init.renames) { return; }
          // Create a property for this file.
          files[rule ? grunt.template.process(rule, props, 'init') : relpath] = obj.rel;
        });
        return files;
      },
      // Search init template paths for filename.
      srcpath: function(arg1) {
        if (arg1 == null) { return null; }
        var args = ['init', name, 'root'].concat(grunt.utils.toArray(arguments));
        return grunt.task.getFile.apply(grunt.file, args);
      },
      // Determine absolute destination file path.
      destpath: path.join.bind(path, process.cwd()),
      // Given some number of licenses, add properly-named license files to the
      // files object.
      addLicenseFiles: function(files, licenses) {
        var available = availableLicenses();
        licenses.forEach(function(license) {
          var fileobj = grunt.task.expandFiles('init/licenses/LICENSE-' + license)[0];
          files['LICENSE-' + license] = fileobj ? fileobj.rel : null;
        });
      },
      // Given an absolute or relative source path, and an optional relative
      // destination path, copy a file, optionally processing it through the
      // passed callback.
      copy: function(srcpath, destpath, options) {
        // Destpath is optional.
        if (typeof destpath !== 'string') {
          options = destpath;
          destpath = srcpath;
        }
        // Ensure srcpath is absolute.
        if (!grunt.file.isPathAbsolute(srcpath)) {
          srcpath = init.srcpath(srcpath);
        }
        // Use placeholder file if no src exists.
        if (!srcpath) {
          srcpath = grunt.task.getFile('init/misc/placeholder');
        }
        grunt.verbose.or.write('Writing ' + destpath + '...');
        try {
          grunt.file.copy(srcpath, init.destpath(destpath), options);
          grunt.verbose.or.ok();
        } catch(e) {
          grunt.verbose.or.error().error(e);
          throw e;
        }
      },
      // Iterate over all files in the passed object, copying the source file to
      // the destination, processing the contents.
      copyAndProcess: function(files, props, options) {
        options = grunt.utils._.defaults(options || {}, {
          process: function(contents) {
            return grunt.template.process(contents, props, 'init');
          }
        });
        Object.keys(files).forEach(function(destpath) {
          var o = Object.create(options);
          var srcpath = files[destpath];
          // If srcpath is relative, match it against options.noProcess if
          // necessary, then make srcpath absolute.
          var relpath;
          if (srcpath && !grunt.file.isPathAbsolute(srcpath)) {
            if (o.noProcess) {
              relpath = srcpath.slice(pathPrefix.length);
              o.noProcess = grunt.file.isMatch({matchBase: true}, o.noProcess, relpath);
            }
            srcpath = grunt.task.getFile(srcpath);
          }
          // Copy!
          init.copy(srcpath, destpath, o);
        });
      },
      // Save a package.json file in the destination directory. The callback
      // can be used to post-process properties to add/remove/whatever.
      writePackageJSON: function(filename, props, callback) {
        var pkg = {};
        // Basic values.
        ['name', 'title', 'description', 'version', 'homepage'].forEach(function(prop) {
          if (prop in props) { pkg[prop] = props[prop]; }
        });
        // Author.
        var hasAuthor = Object.keys(props).some(function(prop) {
          return (/^author_/).test(prop);
        });
        if (hasAuthor) {
          pkg.author = {};
          ['name', 'email', 'url'].forEach(function(prop) {
            if (props['author_' + prop]) {
              pkg.author[prop] = props['author_' + prop];
            }
          });
        }
        // Other stuff.
        if ('repository' in props) { pkg.repository = {type: 'git', url: props.repository}; }
        if ('bugs' in props) { pkg.bugs = {url: props.bugs}; }
        if (props.licenses) {
          pkg.licenses = props.licenses.map(function(license) {
            return {type: license, url: props.homepage + '/blob/master/LICENSE-' + license};
          });
        }

        // Node/npm-specific (?)
        if (props.main) { pkg.main = props.main; }
        if (props.bin) { pkg.bin = props.bin; }
        if (props.node_version) { pkg.engines = {node: props.node_version}; }
        if (props.npm_test) {
          pkg.scripts = {test: props.npm_test};
          if (props.npm_test.split(' ')[0] === 'grunt') {
            if (!props.devDependencies) { props.devDependencies = {}; }
            props.devDependencies.grunt = '~' + grunt.version;
          }
        }

        if (props.dependencies) { pkg.dependencies = props.dependencies; }
        if (props.devDependencies) { pkg.devDependencies = props.devDependencies; }
        if (props.keywords) { pkg.keywords = props.keywords; }

        // Allow final tweaks to the pkg object.
        if (callback) { pkg = callback(pkg, props); }

        // Write file.
        grunt.file.write(init.destpath(filename), JSON.stringify(pkg, null, 2));
      }
    };

    // Make args available as flags.
    init.flags = {};
    args.forEach(function(flag) { init.flags[flag] = true; });

    // Show any template-specific notes.
    if (initTemplate.notes) {
      grunt.log.subhead('"' + name + '" template notes:').writelns(initTemplate.notes);
    }

    // Execute template code, passing in the init object, done function, and any
    // other arguments specified after the init:name:???.
    initTemplate.template.apply(this, [grunt, init, function() {
      // Fail task if errors were logged.
      if (grunt.task.current.errorCount) { taskDone(false); }
      // Otherwise, print a success message.
      grunt.log.writeln().writeln('Initialized from template "' + name + '".');
      // All done!
      taskDone();
    }].concat(args));
  }