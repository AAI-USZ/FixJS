function (filename) {
        // We check for file existence this way so that our lookups are case sensitive regardless of the underlying filesystem.
        var dir = path.dirname(filename)
          , base = path.basename(filename)
        if (!listingCache[dir]) listingCache[dir] = existsSync(dir) ? fs.readdirSync(dir) : []
        return listingCache[dir].indexOf(base) !== -1
      }