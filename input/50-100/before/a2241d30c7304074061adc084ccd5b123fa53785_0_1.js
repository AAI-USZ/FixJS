function(full, prefix, root, _, sep, _, _, suffix) {
        root = root.replace(/-/g, '--');
        root = root.replace(/\./g, '-');
        root = encode(root);
        return (prefix || '') + root + sep + options.serverAndPort + (suffix || '');
    }