function output (route, out) {
    try { message.reply(route.formatter.call(this, out)); }
    catch (err) { console.error('%s Module %s formatter failed!\n%s',
      'ERROR'.red, route.name, err.stack); }
  }