function(passport) {
  passport.use(new FacebookStrategy({
    clientID: "FACEBOOK_APP_ID",
    clientSecret: "FACEBOOK_APP_SECRET",
    callbackURL: "http://localhost:3000/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }));
}