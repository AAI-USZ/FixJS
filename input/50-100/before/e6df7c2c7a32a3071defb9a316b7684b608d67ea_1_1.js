function(email, cb) {
  sync();
  var m = jsel.match(".emails ." + ESC(email), db.users);
  process.nextTick(function() { cb(null, m.length ? m[0].type : undefined); });
}