function(msg) {
    // TODO: replace by port.sender.tab in chrome 20
    var tab = port.tab;
    var actions = msg.action.split('.');

    // Action /*Function*/
    var action = window[actions.shift()];
    while (action && actions[0]) {
      action = action[actions.shift()];
    }

    // Argument /*Array*/ = msg.arguments || msg,
    var argument = (typeof msg.arguments != 'undefined') ? msg.arguments : msg;
    argument = (argument instanceof Array) ? argument : [argument];
    argument.push(tab);

    if (action instanceof Function) action.apply('', argument);
  }