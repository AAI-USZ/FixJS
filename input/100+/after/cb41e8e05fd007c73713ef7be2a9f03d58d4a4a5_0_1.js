function (er, data) {
    if (er) return cb(er)
    data.starredBy = Object.keys(data.users || {}).sort()
    var len = data.starredBy.length
    , diff = len - 10
    data.starredByMsg = ''

    data._time = Date.now()
    if (data.readme) data.readme = parseReadme(data.readme)
    gravatarPeople(data)
    regData.set(k, data)
    data.fromNow = moment(data.time[data['dist-tags'].latest]).fromNow()
   
    if (len > 10) {
      data.starredBy = data.starredBy.slice(0,10)
      var many = ' others...'
      if (diff == 1) many = ' other.'
      data.starredByMsg = ' and ' +  diff + many
    }

    return cb(null, data)
  }