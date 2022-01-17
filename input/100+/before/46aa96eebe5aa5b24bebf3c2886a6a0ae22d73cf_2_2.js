function (ctx) {
  if(ctx.url === '/logout') {
    ctx.session.remove(ctx.done);
    return;
  }

  // set id one wasnt provided in the query
  ctx.query.id = ctx.query.id || this.parseId(ctx);

  switch(ctx.req.method) {
    case 'GET':
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