function(email, cb) {
  sync();
  var m = jsel.match(".emails ." + ESC(email), db.users);
  process.nextTick(function() {
    if (!m.length) cb("no such email");
    else cb(null, m[0].verified);
  });
}