function _createDir(dir) {
            dir = _templatePathName(dir);
            if (existsSync(dir)) {
                sys.puts('dir exists:' + '  ' + dir);
            } else {
                fs.mkdirSync(dir);
                sys.puts('created dir: ' + '  ' + dir);
            }
        }