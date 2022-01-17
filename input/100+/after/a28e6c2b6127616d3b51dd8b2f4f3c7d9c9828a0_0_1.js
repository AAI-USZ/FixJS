function(options) {

  // Config
  var defaultResourceDir = path.resolve(__dirname, 'resources');

  // Filetypes and matching preprocessor binaries
  var fileTypes = {
    '.css': null,
    '.sass': 'sass',
    '.scss': 'scss',
    '.less': 'lessc',
    '.styl': 'stylus'
  };

  var log = options.verbose ? function(str) { console.log(str); }
                            : function() {};

  mkdirp(options.out);

  // Compile custom or default template
  var template = jade.compile(
    readFirstFileSync(options.resources + '/docs.jade',
                      defaultResourceDir + '/docs.jade')
  );

  // Get custom or default JS and CSS files
  var staticFiles = {
    'docs.js': readFirstFileSync(options.resources + '/docs.js',
                                 defaultResourceDir + '/docs.js'),
    'docs.css': readFirstFileSync(options.resources + '/docs.css',
                                  defaultResourceDir + '/docs.css'),
    'previews.js': readFirstFileSync(options.resources + '/previews.js',
                                     defaultResourceDir + '/previews.js')
  };

  // Get optional extra CSS for previews
  var previewCSS = mincss(options.include
    .filter(function(file) { return path.extname(file) === '.css'; })
    .map(readFileSync)
    .reduce(add, '')
  );

  // Get optional extra JavaScript for previews
  var previewJS = minjs(options.include
    .filter(function(file) { return path.extname(file) === '.js'; })
    .map(readFileSync)
    .reduce(add, '')
  );


  // Render template
  var render = function(source, sections, css) {
    if (css == null) css = '';
    return template({
      title: baseFilename(source),
      sections: sections,
      project: { name: options.name, menu: menu },
      previewCSS: mincss(css) + previewCSS,
      previewJS: previewJS
    });
  };

  // Find files
  var files = options['in'].reduce(function(files, file) {
      if (fs.statSync(file).isDirectory()) {
        files = files.concat(findit.sync(file));
      } else {
        files.push(file);
      }
      return files;
    }, [])
    .filter(function(file) {
      // No hidden files
      if (file.match(/(\/|^)\.[^\.\/]/)) return false;
      // Only supported file types
      if (!(path.extname(file) in fileTypes)) return false;
      // Files only
      if (!fs.statSync(file).isFile()) return false;
      return true;
    }).sort();
  if (!files.length) return console.error('No files found');

  var preprocess = function(file, cb) {
    var pp = options.preprocessor || fileTypes[path.extname(file)];
    if (pp != null) {
      exec(pp + ' ' + file, function(err, stdout, stderr) {
        log('styledocco: preprocessing ' + file + ' with ' + pp);
        // Fail gracefully on preprocessor errors
        if (err != null) console.error(err.message);
        if (stderr.length) console.error(stderr);
        cb(null, stdout || '');
      });
    } else {
      fs.readFile(file, 'utf8', cb);
    }
  };

  // Build menu
  var menu = menuLinks(files, options.basePath);

  // Run files through preprocessor and StyleDocco parser.
  async.mapSeries(files, function(file, cb) {
    var content = readFileSync(file);
    preprocess(file, function(err, css) {
      cb(null, {
        path: file,
        html: render(file, styledocco(content), css)
      });
    });
  }, function(err, htmlFiles) {
    // Look for a README file.
    var readmeFile = findFile(options.basePath, /^readme/i) ||
                     findFile(process.cwd(), /^readme/i) ||
                     findFile(options.resources, /^readme/i) ||
                     defaultResourceDir + '/README.md';
    var readme = readFileSync(readmeFile);

    // Add readme with "fake" index path
    htmlFiles.push({
      path: path.join(options.basePath, 'index'),
      html: render('', [ { docs: marked(readme), code: '' } ])
    });

    // Write files to the output dir.
    htmlFiles.forEach(function(file) {
      var dest = path.join(options.out, htmlFilename(file.path, options.basePath));
      log('styledocco: writing ' + file.path + ' -> ' + dest);
      fs.writeFileSync(dest, file.html);
    });

    // Write static resources to the output dir
    Object.keys(staticFiles).forEach(function(file) {
      var dest = path.join(options.out, file);
      log('styledocco: writing ' + file + ' -> ' + dest);
      fs.writeFileSync(dest, staticFiles[file]);
    });
  });
}