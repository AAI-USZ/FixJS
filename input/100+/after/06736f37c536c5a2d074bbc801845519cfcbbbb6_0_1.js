function(e) {
          var hash = o.passwd;
          if(e || typeof hash !== 'string') return cb(e, o.email, o.existing_user);

          // a hash was specified, update the password for the user
          exports.emailToUID(o.email, function(err, uid) {
            if(err) return cb(err, o.email, o.existing_user);

            exports.updatePassword(uid, hash, function(err) {
              cb(err || null, o.email, o.existing_user);
            });
          });
        }