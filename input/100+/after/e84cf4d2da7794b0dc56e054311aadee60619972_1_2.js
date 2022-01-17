function(file, moduleName, skipMeta) {
    var meta, i, m,
        metaPath = path.join('../', moduleName, 'meta', file);

    if (moduleName === 'yui') {
        mods['yui-core'] = true;
    }
    
    if (skipMeta) {
        mods[moduleName] = true;
    } else {
        if (exists(metaPath)) {
            meta = JSON.parse(fs.readFileSync(metaPath));
        } else {
            console.log(('Failed to find meta for' + moduleName).bold.red);
            console.log(metaPath.bold.red);
            return;
        }

        for (i in meta) {
            mods[i] = true;
            for (m in meta[i]) {
                switch (m) {
                    case 'use':
                        meta[i].use.forEach(function(k) {
                            mods[k] = true;
                        });
                        break;
                    case 'submodules':
                    case 'plugins':
                        Object.keys(meta[i][m]).forEach(function(k) {
                            mods[k] = true;
                            if (meta[i][m][k].submodules) {
                                Object.keys(meta[i][m][k].submodules).forEach(function(m) {
                                    mods[m] = true;
                                });
                            }
                        });
                        break;
                }
            }
        }
    }

    modules = Object.keys(mods).sort();
}