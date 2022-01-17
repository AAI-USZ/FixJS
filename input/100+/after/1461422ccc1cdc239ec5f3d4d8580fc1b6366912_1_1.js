function(err, files) {
        if (tasks.exited) {
          return;
        } else if (err) {
          console.log('balUtilPaths.scandir: readdir has failed on:', options.path);
          return tasks.exit(err);
        }
        tasks.total += files.length;
        if (!files.length) {
          return tasks.exit();
        } else {
          return files.forEach(function(file) {
            var fileFullPath, fileRelativePath, isHiddenFile, isIgnoredFile;
            isHiddenFile = options.ignoreHiddenFiles && /^\./.test(file);
            isIgnoredFile = options.ignorePatterns && options.ignorePatterns.test(file);
            if (isHiddenFile || isIgnoredFile) {
              return tasks.complete();
            }
            fileFullPath = pathUtil.join(options.path, file);
            fileRelativePath = options.relativePath ? pathUtil.join(options.relativePath, file) : file;
            return balUtilPaths.isDirectory(fileFullPath, function(err, isDirectory, fileStat) {
              var complete;
              if (tasks.exited) {

              } else if (err) {
                console.log('balUtilPaths.scandir: isDirectory has failed on:', fileFullPath);
                return tasks.exit(err);
              } else if (isDirectory) {
                complete = function(err, skip, subtreeCallback) {
                  if (err) {
                    return tasks.exit(err);
                  }
                  if (tasks.exited) {
                    return tasks.exit();
                  }
                  if (skip !== true) {
                    list[fileRelativePath] = 'dir';
                    tree[file] = {};
                    if (!options.recurse) {
                      return tasks.complete();
                    } else {
                      return balUtilPaths.scandir({
                        path: fileFullPath,
                        relativePath: fileRelativePath,
                        fileAction: options.fileAction,
                        dirAction: options.dirAction,
                        readFiles: options.readFiles,
                        ignorePatterns: options.ignorePatterns,
                        ignoreHiddenFiles: options.ignoreHiddenFiles,
                        recurse: options.recurse,
                        stat: options.fileStat,
                        next: function(err, _list, _tree) {
                          var filePath, fileType;
                          tree[file] = _tree;
                          for (filePath in _list) {
                            if (!__hasProp.call(_list, filePath)) continue;
                            fileType = _list[filePath];
                            list[filePath] = fileType;
                          }
                          if (tasks.exited) {
                            return tasks.exit();
                          } else if (err) {
                            console.log('balUtilPaths.scandir: has failed on:', fileFullPath);
                            return tasks.exit(err);
                          } else if (subtreeCallback) {
                            return subtreeCallback(tasks.completer());
                          } else {
                            return tasks.complete();
                          }
                        }
                      });
                    }
                  } else {
                    return tasks.complete();
                  }
                };
                if (options.dirAction) {
                  return options.dirAction(fileFullPath, fileRelativePath, complete, fileStat);
                } else if (options.dirAction === false) {
                  return complete(err, true);
                } else {
                  return complete(err, false);
                }
              } else {
                complete = function(err, skip) {
                  if (err) {
                    return tasks.exit(err);
                  }
                  if (tasks.exited) {
                    return tasks.exit();
                  }
                  if (skip) {
                    return tasks.complete();
                  } else {
                    if (options.readFiles) {
                      return balUtilPaths.readFile(fileFullPath, function(err, data) {
                        var dataString;
                        if (err) {
                          return tasks.exit(err);
                        }
                        dataString = data.toString();
                        list[fileRelativePath] = dataString;
                        tree[file] = dataString;
                        return tasks.complete();
                      });
                    } else {
                      list[fileRelativePath] = 'file';
                      tree[file] = true;
                      return tasks.complete();
                    }
                  }
                };
                if (options.fileAction) {
                  return options.fileAction(fileFullPath, fileRelativePath, complete, fileStat);
                } else if (options.fileAction === false) {
                  return complete(err, true);
                } else {
                  return complete(err, false);
                }
              }
            });
          });
        }
      }