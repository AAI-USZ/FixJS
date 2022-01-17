function makeRequest (remote, fstr, headers) {
  remote = url.parse(remote)
  log.http(remote.href, "GET")
  regHost = regHost || url.parse(npm.config.get("registry")).host

  if (remote.host === regHost && npm.config.get("always-auth")) {
    remote.auth = new Buffer( npm.config.get("_auth")
                            , "base64" ).toString("utf8")
    if (!remote.auth) return fstr.emit("error", new Error(
      "Auth required and none provided. Please run 'npm adduser'"))
  }

  var proxy = npm.config.get( remote.protocol === "https:"
                            ? "https-proxy"
                            : "proxy")

  request({ url: remote
          , proxy: proxy
          , strictSSL: npm.config.get("strict-ssl")
          , ca: remote.host === regHost ? npm.config.get("ca") : undefined
          , onResponse: onResponse }).pipe(fstr)
  function onResponse (er, res) {
    if (er) return fstr.emit("error", er)
    log.http(res.statusCode + " " + remote.href)
  }
}