function(full, prefix, root, _, sep, _, _, suffix) {
        if(inWhiteList(root)) return full;
        root = root.replace(/-/g, '--');
        root = root.replace(/\./g, '-');
        root = encode(root);
        return (prefix || '') + root + sep + options.serverAndPort + (suffix || '');
    }