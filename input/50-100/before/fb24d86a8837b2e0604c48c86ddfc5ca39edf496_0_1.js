function(f, stat) {
        var _ref;
        if (stat.isDirectory() && (_ref = path.basename(f), __indexOf.call(exceptFolders, _ref) >= 0)) {
          return false;
        }
        if (stat.isDirectory()) {
          return true;
        }
        return /\.(coffee|js|styl|jade)$/.test(f);
      }