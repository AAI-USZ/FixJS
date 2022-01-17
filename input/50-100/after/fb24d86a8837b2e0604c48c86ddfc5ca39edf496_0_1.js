function(f, stat) {
        var _ref;
        if (stat.isDirectory() && (opts.except && (_ref = path.basename(f), __indexOf.call(opts.except, _ref) >= 0))) {
          return false;
        }
        if (stat.isDirectory()) {
          return true;
        }
        return /\.(coffee|js|styl|jade)$/.test(f);
      }