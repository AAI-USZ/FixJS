function(req, model) {
    securePairs[model._clientId] = req.sessionID;
    var session = model.session = req.session
      , userId = session.userId || session.auth && session.auth.userId;
    if (!userId) userId = session.userId = store.uuid();
    model.set('_userId', userId);
  }