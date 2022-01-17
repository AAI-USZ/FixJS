function (err, ready) {
  if (err || !ready) return;

  var count = 10
    , proc = 0;
  for (var i = 0; i < count; i++) {

    pygmentize('-f html -g '+ __filename ,  function (err, res) {
      if (err) log.error('highlighter',  err); else log.info(res.length);
      if (++proc === count) stop();
    });
  }
}