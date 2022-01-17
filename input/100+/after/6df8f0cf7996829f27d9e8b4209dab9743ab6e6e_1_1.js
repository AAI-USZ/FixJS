function sessionMiddleware(opts) {
  opts || (opts = {});
  this.usingSessions = true;

  // The following properties are used in setupSocketAuth
  this._sessionKey = opts.key || (opts.key = 'connect.sid');
  this._sessionSecret = opts.secret;
  var sessionStore = this._sessionStore = opts.store;

  if (!sessionStore) {
    sessionStore = this._sessionStore = opts.store = new MemoryStore;
  }

  patchSessionStore(sessionStore, this);

  var securePairs = this._securePairs = {}
    , store = this;
  this.on('createRequestModel', function(req, model) {
    securePairs[model._clientId] = req.sessionID;
    var session = model.session = req.session
      , userId = session.userId || session.auth && session.auth.userId;
    if (!userId) userId = session.userId = store.uuid();
    model.set('_userId', userId);
  });

  return createSessionMiddleware(opts);
}