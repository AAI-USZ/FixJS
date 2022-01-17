function(shortRoute, ext, rootDir) {
        if (context.js.root[0] === '/') context.js.root = context.js.root.slice(1);
        if (shortRoute.match(EXPLICIT_PATH)) {
          if (!shortRoute.match(REMOTE_PATH)) {
            if (shortRoute[0] === '/') shortRoute = shortRoute.slice(1);
          }
        } else {
          shortRoute = rootDir + '/' + shortRoute;
        }
        if (ext && shortRoute.indexOf(ext, shortRoute.length - ext.length) === -1) {
          shortRoute += ext;
        }
        return shortRoute;
      }