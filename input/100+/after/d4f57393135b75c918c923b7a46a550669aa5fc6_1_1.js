function (err, apps) {
  if (err) {
    console.error('Cannot find app dir.');
    process.exit(-1);
  }
  else {
    for (var i in apps) {
      var a = apps[i];
      try {
        if (fs.existsSync(path.resolve('./app', a, 'config.js'))) {
          loadApp(path.resolve('./app', a));
          console.log('loaded app ' + a);
        }
      }
      catch (err) {
        console.log('load app ' + a + ' fail: ' + err.stack);
      }
    }
  }
}