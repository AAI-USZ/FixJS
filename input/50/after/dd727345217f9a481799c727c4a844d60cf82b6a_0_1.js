function(path, base) {
        if (path.indexOf('/base') == 0) path = path.slice(1);
        return Path.resolve(base, path);
    }