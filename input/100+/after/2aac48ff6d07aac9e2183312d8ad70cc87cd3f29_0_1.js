function(c, key){
    if (key && 'enter' == key.name) {
      console.log();
      process.stdin.removeAllListeners('keypress');
      process.stdin.setRawMode(false);
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
  }