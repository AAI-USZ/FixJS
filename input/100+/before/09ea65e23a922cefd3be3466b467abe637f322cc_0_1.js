function(message, item) {
    var msg = message;
    var variables = msg.match(/\{[.\w]+\}/ig);

    if (msg.indexOf('{alias}') >= 0) {
      msg = msg.replace('{alias}', item.alias);
    }

    for (var i in variables) {
      var key = variables[i].match(/\w+/ig);
      var value = item.pattern[key[0]];
      if (key.length > 1) {
        for (var v = 1; v < key.length; v++) {
          value = value[key[v]];
        }
      }
      if ( typeof (value) === 'object') {
        value = value.toString();
      }
      msg = msg.replace(variables[i], value);
    }
    msg = msg.replace(/\{[.\w]+\}/ig, '');
    return msg;
  }