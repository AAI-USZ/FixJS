function (er, data) {
    if (er) return cb(er)
    data._time = Date.now()
    if (data.readme) data.readme = parseReadme(data.readme)
    gravatarPeople(data)
    regData.set(k, data)
    data.fromNow = moment(data.time[data['dist-tags'].latest]).fromNow()
    return cb(null, data)
  }