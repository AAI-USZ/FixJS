function(err) {
  if(!err) {
    err = {};
    Error.captureStackTrace(err);
  }

  var lines = err.stack.split('\n'),
      first = lines[0],
      stack = lines.slice(1);

  var frames,
      match1, match2;

  frames = stack.map(function(line) {
    match1 = err_re1.exec(line);
    match2 = err_re2.exec(line);

    if(match1) {
        return new Frame(match1[1], match1[2], parseInt(match1[3], 10), parseInt(match1[4], 10))
    } else if(match2) {
        return new Frame('<anonymous>', match2[1], parseInt(match2[2], 10), parseInt(match2[3], 10))
    }
  });

  return new Trace(first, frames, err);
}