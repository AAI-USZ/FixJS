function(cursor) {
  var argTraces = this.createInputArgTrace();
  // Generally the 'argument at the cursor' is the argument before the cursor
  // unless it is before the first char, in which case we take the first.
  cursor = cursor === 0 ? 0 : cursor - 1;
  var cTrace = argTraces[cursor];

  var markup = [];
  for (var i = 0; i < argTraces.length; i++) {
    var argTrace = argTraces[i];
    var arg = argTrace.arg;
    var status = Status.VALID;
    if (argTrace.part === 'text') {
      status = arg.assignment.getStatus(arg);
      // Promote INCOMPLETE to ERROR  ...
      if (status === Status.INCOMPLETE) {
        // If the cursor is in the prefix or suffix of an argument then we
        // don't consider it in the argument for the purposes of preventing
        // the escalation to ERROR. However if this is a NamedArgument, then we
        // allow the suffix (as space between 2 parts of the argument) to be in.
        // We use arg.assignment.arg not arg because we're looking at the arg
        // that got put into the assignment not as returned by tokenize()
        var isNamed = (cTrace.arg.assignment.arg.type === 'NamedArgument');
        var isInside = cTrace.part === 'text' ||
                        (isNamed && cTrace.part === 'suffix');
        if (arg.assignment !== cTrace.arg.assignment || !isInside) {
          // And if we're not in the command
          if (!(arg.assignment instanceof CommandAssignment)) {
            status = Status.ERROR;
          }
        }
      }
    }

    markup.push({ status: status, string: argTrace.char });
  }

  // De-dupe: merge entries where 2 adjacent have same status
  var i = 0;
  while (i < markup.length - 1) {
    if (markup[i].status === markup[i + 1].status) {
      markup[i].string += markup[i + 1].string;
      markup.splice(i + 1, 1);
    }
    else {
      i++;
    }
  }

  return markup;
}