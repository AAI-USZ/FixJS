function createRecursive(p) {
        if (path.existsSync(p) || p === bucketPath) return;
        createRecursive(path.join(p, '..'));
        fs.mkdirSync(p, 0777);
      }