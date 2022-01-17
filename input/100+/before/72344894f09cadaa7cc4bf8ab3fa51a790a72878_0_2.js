function(str, mask, fn){
  var self = this
    , buf = '';

  // default mask
  if ('function' == typeof mask) {
    fn = mask;
    mask = '';
  }

  process.stdin.resume();
  tty.setRawMode(true);
  process.stdout.write(str);

  // keypress
  process.stdin.on('keypress', function(c, key){
    if (key && 'enter' == key.name) {
      console.log();
      process.stdin.removeAllListeners('keypress');
      tty.setRawMode(false);
      if (!buf.trim().length) return self.password(str, mask, fn);
      fn(buf);
      return;
    }

    if (key && key.ctrl && 'c' == key.name) {
      console.log('%s', buf);
      process.exit();
    }

    process.stdout.write(mask);
    buf += c;
  }).resume();
}