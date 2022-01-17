function format(out) {
      context.log.debug('Handler output', out);
      try { message.reply(route.formatter.call(context, out)); }
      catch (e) {
        console.error('%s Module %s formatter failed!', 'ERROR'.red, route.name.yellow);
        chan.log.exception(e, 'Module ' + route.name + ' formatter failed');
      }
    }