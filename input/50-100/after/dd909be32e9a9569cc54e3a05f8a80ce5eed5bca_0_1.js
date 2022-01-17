function (err, u) {
          if(u) return ctx.done({email: 'is already in use'});
          uc.save(ctx.session, ctx.body, ctx.query, ctx.dpd, done);  
        }