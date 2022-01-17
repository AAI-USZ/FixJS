function () {
    handler.call(module.context, arguments, function (out) {
      if (chan.isCore) { // If this is core channel the first argument is the network name.
        chan.network.say(arguments[0], chan.name, event.formatter(out));
      } else {
        chan.network.say(chan.name, event.formatter(out));
      }
    });
  }