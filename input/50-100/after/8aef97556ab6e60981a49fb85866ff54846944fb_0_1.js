function(access, refresh, profile, done) {
      for (id in profile.emails) {
        var email = profile.emails[id].value;

        if (module.exports.validateEmail(email)) {
          return done(null, profile);
        }
      }

      return done(false, null);
    }