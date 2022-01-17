function makeRequest (method, remote, where, what, etag, nofollow, cb) {
  var opts = { url: remote
             , method: method
             , agent: getAgent(remote)
             , strictSSL: npm.config.get("strict-ssl") }
    , headers = opts.headers = {}
  if (etag) {
    log.verbose(etag, "etag")
    headers[method === "GET" ? "if-none-match" : "if-match"] = etag
  }

  headers.accept = "application/json"

  opts.proxy = npm.config.get( remote.protocol === "https:"
                             ? "https-proxy" : "proxy" )

  // figure out wth 'what' is
  if (what) {
    if (Buffer.isBuffer(what) || typeof what === "string") {
      opts.body = what
      headers["content-type"] = "application/json"
      headers["content-length"] = Buffer.byteLength(what)
    } else if (what instanceof Stream) {
      headers["content-type"] = "application/octet-stream"
      if (what.size) headers["content-length"] = what.size
    } else {
      delete what._etag
      opts.json = what
    }
  }

  if (nofollow) {
    opts.followRedirect = false
  }

  log.http(remote.href || "/", method)

  var req = request(opts, requestDone(method, where, cb))
  var r = npm.config.get("registry")
  if (!r) {
    return new Error("Must define registry URL before accessing registry.")
  }

  req.on("error", cb)

  if (what && (what instanceof Stream)) {
    what.pipe(req)
  }
}