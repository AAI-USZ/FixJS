function(file) {
        var stat = fs.statSync(path.join(this.root, file));
        return !stat.isDirectory() &&
                stat.isFile() &&
                this.extRegex.test(file) &&
                this.filter.test(file);
    }