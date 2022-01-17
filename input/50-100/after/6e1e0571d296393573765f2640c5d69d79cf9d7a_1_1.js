function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  passport.use(new FacebookStrategy({
    clientID: "CLIENT_ID",
    clientSecret: "CLIENT_SECRET",
    callbackURL: "http://localhost:3000/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }));
}