function docsUrl(args, cb) {
  var n = args[0].split("@").shift()

  request.get("https://registry.npmjs.org/" + n + "/latest", { json: true }, onData);
  function onData(er, response, d) {
    if (!(!er && response.statusCode == 200)) return cb(er)

    var homepage = d.homepage
      , repo = d.repository || d.repositories
    if (homepage) return cb(null, homepage)
    if (repo) {
      if (Array.isArray(repo)) repo = repo.shift()
      if (repo.hasOwnProperty("url")) repo = repo.url
      if (repo) {
        return cb(null, repo.replace(/^git(@|:\/\/)/, 'http://')
                            .replace(/\.git$/, '') + "#readme")
      }
    }
    return cb(null, "http://search.npmjs.org/#/" + d.name)
  }
}