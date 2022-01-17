function installModule() {
    var cmd = 'npm install ' + module;
    console.log("Installing locally the module " + module);
    console.log(cmd);
    var child = exec(cmd, function (err) {
      callback(err);
    });
    child.stdout.on('data', console.log.bind(console));
    child.stderr.on('data', console.error.bind(console));
  }