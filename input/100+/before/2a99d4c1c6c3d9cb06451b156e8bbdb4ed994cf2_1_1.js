function (err, meta) {
      if (err && err.code !== 'ENOENT' && err.code !== 'ENOTDIR') {
        console.error("While loading metadata for", that.path, ":", err.stack);
        cb(err, null);
      } else {
        that.meta = meta || {};
      }

      if (that.meta.type === undefined) {
        that.meta.type = type.nameFromType[that.type];
        driver.dumpMeta(that.path, that.meta);
      }
      cb(null, that);
    }