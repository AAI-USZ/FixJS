function(err, sitesStr) {
    var sites = JSON.parse(sitesStr) || []
    var pending = sites.length
    sites.forEach(function(site, i) {
      util.log('Checking '+site.name+'...')
      request.head(site.url, function(err, res) {
        var ok = true
        if (err) {
          util.log(err)
          ok = false
        } else {
          if (res.statusCode !== 200) ok = false
        }
        if (ok != site.ok) { // site status has changed
          var stat = ok ? 'up' : 'down'
          util.log('Site '+site.name+' is '+stat)
          db.lpush('checky:sites:'+site.name, (new Date()).toISOString()+' Site is '+stat)
          if (ok) {
            site.ok = ok // set site.ok to new status
          } else {
            // don't say it's down unless it's been down for at least 3 rounds
            db.lrange('checky:sites:'+site.name, 0, 2, function(err, prevStats) {
              var prevStatsWords
              var down = true
              for (var i=0; i<prevStats.length; i++) {
                prevStatsWords = prevStats[i].split(' ')
                if (prevStatsWords[prevStatsWords.length-1] == 'up') down = false
              }
              if (down) site.ok = ok // it's definitely down, so set status
            })
          }
        }
        if (!--pending) setIfNew(sites, sitesStr)
      })
    })
  }