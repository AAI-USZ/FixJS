function(libraryName, env) {
  if (env.interactive) {
    runInteractiveSession(libraryName, env);

    // runInteractiveSession will call this function again without interactive
    // mode enabled and with the interactive inputs
    return;
  }

  var url = env.url;
  var path = env.path;
  var version = env.version;
  var latest = env.latest;
  var type = env.type;
  var minify = env.minify;

  // normalize library names to lowercase
  libraryName = libraryName.toLowerCase();

  if (!url) {
    // find library information in the libraries file
    var library = libraries.get(libraryName);
    if (!library) {
      console.error('Could not find library ' + libraryName + '. Please' +
                    ' specify a URL via the -u/--url parameter or jump into' +
                    ' the interactive mode with -i/--interactive.');
      return;
    }

    url = library.url;
    path = library.path;
    type = library.type || 'js';

    if (!version) {
      // if no version was specified, assume the user wants the latest
      version = library.latest;
    }
    if (!minify) {
      minify = library.minify;
    }
  } else {
    // if library information is given, save it for future use
    libraries.set(libraryName, {
      type: type,
      url: url,
      path: path,
      latest: latest || version,
      minify: minify
    });
    
    libraries.save(function(err) {
      if (err) {
        console.error('Could not save the library configuration to disk.');
      }
    });
  }

  url = url.replace(/\{\{\s*version\s*\}\}/, version);
  var fileName;

  if (version) {
    fileName = libraryName + '-' + version + '.' + type;
  } else {
    fileName = libraryName + '.' + type;
  }

  var dirName = env.output;
  if (url && path) {
    // download the zip archive to a temporary file
    var toFileName = 'nodefront-' + libraryName + '-tmp';

    downloadFile(url, toFileName)
      .then(function() {
        var pathRegex = new RegExp(path);
        var zip;
        var entries;
        var foundPath = false;

        try {
          zip = new Zip(toFileName);
          entries = zip.getEntries();
        } catch (error) {
          // error thrown is not an error object and q can't handle that well;
          // convert it here
          throw new Error(error);
        }

        // find the path that matches the regular expression
        for (var i = 0; i < entries.length; i++) {
          if (pathRegex.test(entries[i].entryName)) {
            foundPath = true;
            console.log('Matched path ' + entries[i].entryName);

            outputFileData(zip.readAsText(entries[i]), libraryName, fileName,
              dirName);

            if (minify) {
              minifyCommand(utils.regExpEscape(fileName), { overwrite: true });
            }
            break;
          }
        }

        if (!foundPath) {
          console.error('The path you specified could not be found.');
        }
      })
      .fin(function() {
        // delete the temporary file
        fs.unlinkSync(toFileName);
      })
      .end();
  } else if (url) {
    // download the file at the URL and output it
    downloadFile(url)
      .then(function(data) {
        outputFileData(data, libraryName, fileName, dirName);

        if (minify) {
          minifyCommand(utils.regExpEscape(fileName), { overwrite: true });
        }
      })
      .end();
  }
}