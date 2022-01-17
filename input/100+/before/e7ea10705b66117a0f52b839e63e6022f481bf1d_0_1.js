function(middleware, key) {
            if (middleware.handle.tag === 'session') {
              foundMiddleware = true;
              var maxAge = calipso.config.get('session:maxAge');
              if (maxAge) {
                try {
                  maxAge = Number(maxAge);
                }
                catch (e) {
                  calipso.error('MaxAge value ' + maxAge + ' is not a numeric string');
                  maxAge = undefined;
                }
              }
              mw = calipso.lib.express.session({
                secret: calipso.config.get('session:secret'),
                store: calipso.app.sessionStore = new mongoStore({
                  db: calipso.db.db
                }),
                cookie: { maxAge: maxAge }
              });
              mw.tag = 'session';
              calipso.app.stack[key].handle = mw;
            }
          }