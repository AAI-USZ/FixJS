function (ctx) {
  if(ctx.url === '/logout') {
    ctx.session.remove(ctx.done);
    return;
  }

  // set id one wasnt provided in the query
  ctx.query.id = ctx.query.id || this.parseId(ctx);

  switch(ctx.req.method) {
    case 'GET':
      if(ctx.url === '/me') {
        debug('session %j', ctx.session.data);
        if(!(ctx.session && ctx.session.data && ctx.session.data.uid)) {
          ctx.res.statusCode = 401;
          return ctx.done(new Error('Not logged in'));
        }

        return this.find(ctx.session, {id: ctx.session.data.uid}, ctx.done);
      }

      this.find(ctx.session, ctx.query, ctx.done);
    break;
    case 'POST':
      if(ctx.url === '/login') {
        var path = this.settings.path
          , credentials = ctx.req.body
          , uc = this;

        this.store.first({email: credentials.email}, function(err, user) {
          if(err) return ctx.done(err);

          if(user) {
            var salt = user.password.substr(0, SALT_LEN)
              , hash = user.password.substr(SALT_LEN);

            if(hash === uc.hash(credentials.password, salt)) {
              debug('logged in as %s', credentials.email);
              ctx.session.set({path: path, uid: user.id}).save(ctx.done);
              return;
            }
          }

          ctx.res.statusCode = 401;
          ctx.done(null, 'bad credentials');
        });
        break;
      }
    case 'PUT':
      if(ctx.body && ctx.body.password) {
        var salt = uuid.create(SALT_LEN);
        ctx.body.password = salt + this.hash(ctx.body.password, salt);
      }
      this.save(ctx.session, ctx.body, ctx.query, ctx.done);
    break;
    case 'DELETE':
      this.remove(ctx.session, ctx.query, ctx.done);
    break;
  }
}