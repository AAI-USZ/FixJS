function(has_listeners, event, data) {
  if (has_listeners) {
    return ((module.exports._events && module.exports._events.stats) ?
            module.exports._events.stats.length > 0 : false);
  } else {
    return module.exports.emit(event, data);
  }
}