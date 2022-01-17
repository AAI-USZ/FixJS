function(data) {
    var msg = util.format('%s', data.toString());
    if (msg.length === 0) return;

    log.info(command, msg);
    infos.push(msg);
  }