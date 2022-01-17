function output (route, out) {
    try { chan.say(route.formatter(out)); }
    catch (err) {
      console.error('%s Module %s formatter failed!', 'ERROR'.red, route.module);
      console.log(err.stack);
    }
  }