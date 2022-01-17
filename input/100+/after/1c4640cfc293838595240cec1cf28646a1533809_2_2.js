function unzipDownload(type, file, callback) {

  var zf,
      baseFolder,
      tmpFolder,
      tmpName;

  try {
    zf = new zip.ZipFile(file)
  } catch(ex) {
    return callback(ex);
  }

  zf.names.forEach(function(name) {

      // First result is the basefolder
      if(!baseFolder) {
        baseFolder = name; // Store
      }

      // Now, lets find the package.json
      if(type === 'module' && name === (baseFolder + "package.json")) {
          var buffer = zf.readFileSync(name);
          var packageJson = JSON.parse(buffer);
          tmpName = packageJson.name;
          tmpFolder = path.join(path.dirname(file),tmpName + "/"); // Extraction will go here
      }

      // Now, lets find the theme.json
      if(type === 'theme' && name === (baseFolder + "theme.json")) {
          var buffer = zf.readFileSync(name);
          var themeJson = JSON.parse(buffer);
          tmpName = themeJson.name;
          tmpFolder = path.join(path.dirname(file),tmpName + "/"); // Extraction will go here
      }

  });

  // Check that we have both a module name
  if(tmpName) {

    // Make sure we delete any existing tmp folder
    if((fs.existsSync || path.existsSync)(tmpFolder)) {
      rimraf.sync(tmpFolder);
    }

    // First run through and create every directory synchronously
    var folders = [];
    zf.names.forEach(function(name) {
        folders.push(name.replace(baseFolder,"").split("/"));
    });

    folders.forEach(function(folderList) {
      var folder = tmpFolder;
      folderList.forEach(function (currFolder) {
          var isDir = (!path.extname(currFolder) || currFolder[0] === '.');
          folder = path.join(folder, currFolder);
          if(isDir) {
            dirExists(folder);
          }
      });
    });

    // Now, lets extract all the files
    var remaining = zf.names.length;

    zf.names.forEach(function(name) {

           var dest = path.join(
                tmpFolder,
                name.replace(baseFolder,"")
           );

            // Skip directories, hiddens.
            var isDir = (!path.extname(name) || name[0] === '.' || name[name.length] === "/");
            if (isDir) {
              remaining--;
              if (!remaining) return callback(null);
            } else {
              zf.readFile(name, function(err, buff) {
                  if (err) return callback(err);
                  fs.open(dest, 'w', 0644, function(err, fd) {
                    if(err) {
                      if(err.code !== "EISDIR") {
                        // fs.unlinkSync(file);
                        return callback(err);
                      } else {
                        remaining--;
                      }

                    } else {
                      fs.write(fd, buff, 0, buff.length, null, function(err) {
                          if (err) {
                            fs.unlinkSync(file);
                            return callback(err);
                          }
                          fs.close(fd, function(err) {
                              if (err) return callback(err);
                              remaining--;
                              if (!remaining) {
                                fs.unlinkSync(file);
                                callback(null,tmpName,tmpFolder);
                              }
                          });
                      });
                    }
                  });
              });
            }
    });


  } else {
    if(type === 'module') {
      next(new Error("The file does not appear to have a valid package.json that specifies the name."));
    } else {
       next(new Error("The file does not appear to have a valid theme.json that specifies the name."));
    }

  }

}