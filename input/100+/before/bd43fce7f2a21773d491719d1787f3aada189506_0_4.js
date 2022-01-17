function handleRoute(r) {
    r.handler.call(r.module,
      { from: from
      , message: message
      , hostmask: raw.prefix
      , args: message.split(' ').splice(1) },
      function (out) {
        try { chan.say(r.formatter(out)); }
        catch (err) {
          console.error('%s Module %s formatter failed!', 'ERROR'.red, r.module);
          console.log(err.stack);
        }
      }
    );
  }