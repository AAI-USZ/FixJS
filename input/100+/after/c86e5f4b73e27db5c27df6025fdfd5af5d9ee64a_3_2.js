function createFile(filename, contents) {
        var root = process.cwd();
        if (options.appname) {
            filename = path.join(options.appname, filename);
        }
        var fullPath = root + '/' + filename;
        if (railway.utils.existsSync(fullPath)) {
            sys.puts($('exists').bold.grey + '  ' + filename);
        } else {
            fs.writeFileSync(fullPath, contents);
            sys.puts($('create').bold.green + '  ' + filename);
        }
        return fullPath;
    }