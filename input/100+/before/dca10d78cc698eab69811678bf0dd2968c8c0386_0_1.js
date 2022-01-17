function checkout(version, cb) {
  var n = this;
  var source = path.dirname(this.resolveToExe(version));
  
  fs.writeFile(__dirname+'\\..\\bin\\node.cmd',
  [ '@echo off'
  , ':: Created by nodist'
  , '"'+source+'\\node.exe" %*'
  ].join('\r\n'), function(err) {
    if(err) return cb(new Error('Couldn\'t activate version: '+err.message));
    cb();
  });
  
  fs.writeFile(__dirname+'\\..\\bin\\npm.cmd',
  [ '@echo off'
  , ':: Created by nodist'
  , 'set npm_config_prefix='+source
  , '"%~dp0\\..\\node.exe" "%~dp0\\..\\node_modules\\npm\\cli.js" %*'
  ].join('\r\n'), function(err) {
    if(err) return cb(new Error('Couldn\'t activate version: '+err.message));
    cb();
  });
}