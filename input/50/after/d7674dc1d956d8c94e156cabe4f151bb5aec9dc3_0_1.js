function createRecursive(p) {
        if (fs.existsSync(p) || p === bucketPath) return;
        createRecursive(path.join(p, '..'));
        fs.mkdirSync(p, 0777);
      }