function (ctx) {
  var uc = this;

  if(ctx.url === '/logout') {
    if (ctx.res.cookies) ctx.res.cookies.set('sid', null);
    ctx.session.remove(ctx.done);
    return;
  }

  // set id one wasnt provided in the query
  ctx.query.id = ctx.query.id || this.parseId(ctx);

  // make sure password will never be included
  if(ctx.query.$fields) ctx.query.$fields.password = 0;
  else ctx.query.$fields = {password: 0};

  switch(ctx.req.method) {
    case 'GET':
      if(ctx.url === '/me') {
        debug('session %j', ctx.session.data);
        if(!(ctx.session && ctx.session.data && ctx.session.data.uid)) {
          ctx.res.statusCode = 401;
          return ctx.done('Not logged in');
        }

        return this.find(ctx.session, {id: ctx.session.data.uid, $fields: {password: 0}}, ctx.dpd, ctx.done);
      }

      this.find(ctx.session, ctx.query, ctx.dpd, ctx.done);
    break;
    case 'POST':
      if(ctx.url === '/login') {
        var path = this.settings.path
          , credentials = ctx.req.body
          , uc = this;

        debug('trying to login as %s', credentials.email);

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
      function done(err, res) {
        if (res) delete res.password;
        ctx.done(err, res);  
      }

      if(ctx.query.id) {
        this.save(ctx.session, ctx.body, ctx.query, ctx.dpd, done);
      } else {
        this.store.first({email: ctx.body.email}, function (err, u) {
          if(u) return ctx.done({errors: {email: 'is already in use'}});
          uc.save(ctx.session, ctx.body, ctx.query, ctx.dpd, done);  
        })
      }
    break;
    case 'DELETE':
      debug('removing', ctx.query, ctx.done);
      this.remove(ctx.session, ctx.query, ctx.done);
    break;
  }
}