function (name) {
  debug('creating transport "%s"', name);
  var query = clone(this.query)
  query.transport = name;

  if (this.id) {
    query.sid = this.id;
  }

  var transport = new transports[name]({
      host: this.host
    , port: this.port
    , secure: this.secure
    , path: this.path
    , query: query
    , forceJSONP: this.forceJSONP
    , flashPath: this.flashPath
    , policyPort: this.policyPort
  });

  return transport;
}