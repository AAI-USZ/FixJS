function handle(route, data) {
    var context = route.module.context;

    function format(out) {
      try { message.reply(route.formatter.call(context, out)); }
      catch (e) {
        console.error('%s Module %s formatter failed!', 'ERROR'.red, route.name);
        chan.log.exception(e, 'Module ' + route.name + ' formatter failed');
      }
    }

    try { route.handler.call(context, data, format); }
    catch (e) {
       console.error('%s Module %s handler failed!', 'ERROR'.red, route.name);
       chan.log.exception(e, 'Module ' + route.name + ' handler failed');
    }
  }