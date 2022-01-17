function(path, sha1) {
      if (ls1.bySha1[sha1]) {
        if (ls1.bySha1[sha1] === path) {
          // no change
          delete deletedPaths[path];
        } else {
          // renamed; blob the same, though
          // note that we're not catching renames that are mostly the same... they're just counting as delete & add
          changes.push({ type: 'rename', before: { path: ls1.bySha1[sha1], sha1: sha1 }, after: { path: path, sha1: sha1 } });
          delete deletedPaths[ls1.bySha1[sha1]];
        }
      } else {
        if (ls1.byPath[path]) {
          // changed
          changes.push({ type: 'change', before: { path: path, sha1: ls1.byPath[path] }, after: { path: path, sha1: sha1 } });
          delete deletedPaths[path];
        } else {
          // added
          changes.push({ type: 'add', before: { }, after: { path: path, sha1: sha1 } });
        }
      }
    }