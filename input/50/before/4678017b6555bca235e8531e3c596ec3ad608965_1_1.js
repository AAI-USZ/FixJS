function () {
    if (path.existsSync(lock_file))
      fs.unlinkSync(lock_file);
    if (irc.debug) console.log('Quitting . . .');
    callback();
    process.exit(0);
  }