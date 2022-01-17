function copy() {
        if (fileInfo.isFile && path.basename(fileInfo.sourcePath) === 'package.json') {
          deepExtend(packageJSONByTarget[pacakgeJSONLocation], JSON.parse(fs.readFileSync(fileInfo.sourcePath)));
          next();
        } else if (fileInfo.isFile && path.basename(fileInfo.sourcePath) === 'lumbar.json') {
          deepExtend(lumbarJSONByTarget[lumbarJSONLocation], JSON.parse(fs.readFileSync(fileInfo.sourcePath)));
          next();
        } else {
          execute(['cp -r ' + path.join(__dirname, '..', fileInfo.sourcePath) + (!fileInfo.isFile ? '/' : '') + ' ' + path.join(target, fileInfo.targetPath)], next);
        }
      }