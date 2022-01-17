function format(out) {
      try { message.reply(route.formatter.call(context, out)); }
      catch (e) {
        console.error('%s Module %s formatter failed!', 'ERROR'.red, route.name);
        chan.log.exception(e, 'Module ' + route.name + ' formatter failed');
      }
    }