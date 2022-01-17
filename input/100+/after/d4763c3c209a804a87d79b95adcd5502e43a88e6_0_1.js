function execute (command, args, callback) {
  var errors  =  []
    , infos   =  []
    , spawned =  spawn (command, args)
    ;

  log.silly(command, args);

  spawned.stdout.on('data', function(data) {
    var msg = util.format('%s', data.toString());
    if (msg.length === 0) return;

    log.info(command, msg);
    infos.push(msg);
  });
  spawned.stderr.on('data', function(data) {
    var msg = util.format('%s', data.toString());
    log.error(command, msg);
    errors.push(msg);
  });
  spawned.on('exit', function(code) {
    log.verbose(command, 'exited with: ' + code);
    callback((errors.length > 0 ? errors : null), infos);
  });
}