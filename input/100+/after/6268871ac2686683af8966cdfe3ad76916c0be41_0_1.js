function (er, data) {
    if (er) return cb(er)
    data.starredBy = Object.keys(data.users || {}).sort()
    var len = data.starredBy.length

    data._time = Date.now()
    if (data.readme) data.readme = parseReadme(data.readme)
    gravatarPeople(data)
    regData.set(k, data)
    data.fromNow = moment(data.time[data['dist-tags'].latest]).fromNow()


    return cb(null, data)
  }