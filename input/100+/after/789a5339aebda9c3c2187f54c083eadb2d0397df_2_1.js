function(o) {
    for (var k in o) {
      if (!o.hasOwnProperty(k)) continue

      var previous = config[k]
      var current = o[k]

      if (previous && k === 'alias') {
        for (var p in current) {
          if (current.hasOwnProperty(p)) {

            var prevValue = previous[p]
            var currValue = current[p]

            // Converts {jquery: '1.7.2'} to {jquery: 'jquery/1.7.2/jquery'}
            if (/^\d+\.\d+\.\d+$/.test(currValue)) {
              currValue = p + '/' + currValue + '/' + p
            }

            checkAliasConflict(prevValue, currValue, p)
            previous[p] = currValue

          }
        }
      }
      else if (previous && (k === 'map' || k === 'preload')) {
        // for config({ preload: 'some-module' })
        if (util.isString(current)) {
          current = [current]
        }

        util.forEach(current, function(item) {
          if (item) {
            previous.push(item)
          }
        })
      }
      else {
        config[k] = current
      }
    }

    // Makes sure config.base is an absolute path.
    var base = config.base
    if (base && !util.isAbsolute(base)) {
      config.base = util.id2Uri((util.isRoot(base) ? '' : './') + base + '/')
    }

    // Uses map to implement nocache.
    if (config.debug === 2) {
      config.debug = 1
      seajs.config({
        map: [
          [/^.*$/, function(url) {
            if (url.indexOf(noCachePrefix) === -1) {
              url += (url.indexOf('?') === -1 ? '?' : '&') + noCacheTimeStamp
            }
            return url
          }]
        ]
      })
    }

    debugSync()

    return this
  }