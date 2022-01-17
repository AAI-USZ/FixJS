function (head, req) {
  require("monkeypatch").patch(Object, Date, Array, String)
  var basePath = req.requested_path
  if (basePath.indexOf("_list") === -1) basePath = ""
  else {
    basePath = basePath.slice(0, basePath.indexOf("_list"))
                       .concat(["_rewrite", ""]).join("/")
  }

  var row
    , semver = require("semver")
    , res = []

  if (req.query.jsonp) send(req.query.jsonp + "(")
  send('{"_updated":' + Date.now())
  while (row = getRow()) {
    if (!row.id) continue

    var doc = row.value
    if (!doc.name || !doc._id ||
        encodeURIComponent(doc._id) !== doc._id) continue

    var p = {}

    // legacy kludge
    delete doc.mtime
    delete doc.ctime
    if (doc.versions) for (var v in doc.versions) {
      var clean = semver.clean(v)
      delete doc.versions[v].ctime
      delete doc.versions[v].mtime
      if (clean !== v) {
        var x = doc.versions[v]
        delete doc.versions[v]
        x.version = v = clean
        doc.versions[clean] = x
      }
    }
    if (doc["dist-tags"]) for (var tag in doc["dist-tags"]) {
      var clean = semver.clean(doc["dist-tags"][tag])
      if (!clean) delete doc["dist-tags"][tag]
      else doc["dist-tags"][tag] = clean
    }
    // end kludge

    for (var i in doc) {
      if (i === "versions" || i.charAt(0) === "_" || i === 'readme' ||
          i === 'time') continue
      p[i] = doc[i]
    }
    if (p['dist-tags'] && typeof p['dist-tags'] === 'object') {
      p.versions = Object.keys(p['dist-tags']).reduce(function (ac, v) {
        ac[ p['dist-tags'][v] ] = v
        return ac
      }, {})
    }
    if (doc.repositories && Array.isArray(doc.repositories)) {
      doc.repository = doc.repositories[0]
      delete doc.repositories
    }
    if (doc.repository) p.repository = doc.repository
    if (doc.description) p.description = doc.description
    for (var i in doc.versions) {
      if (doc.versions[i].repository && !doc.repository) {
        p.repository = doc.versions[i].repository
      }
      if (doc.versions[i].keywords) p.keywords = doc.versions[i].keywords
    }
    send(',' + JSON.stringify(doc._id) + ':' + JSON.stringify(p))
  }
  send('}')
  if (req.query.jsonp) send(')')

}