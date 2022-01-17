function createDir(dir) {
        var root = process.cwd();
        if (options.appname && !createDir.rootCreated) {
            createDir.rootCreated = true;
            createDir('');
        }
        if (options.appname) {
            dir = path.join(options.appname, dir);
        }
        if (path.existsSync(path.join(root, dir))) {
            sys.puts($('exists').bold.grey + '  ' + dir);
        } else {
            fs.mkdirSync(path.join(root, dir), 0755);
            sys.puts($('create').bold.green + '  ' + dir);
        }
    }