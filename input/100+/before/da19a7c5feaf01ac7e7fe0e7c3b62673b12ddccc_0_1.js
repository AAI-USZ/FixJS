function copy() {
        execute(['cp -r ' + path.join(__dirname, '..', fileInfo.sourcePath) + (!fileInfo.isFile ? '/' : '') + ' ' + path.join(target, fileInfo.targetPath)], next);
      }