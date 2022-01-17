function(assignment) {
    if (!assignment.param.isPositionalAllowed) {
      return;
    }
    if (current.arg.type === 'NamedArgument') {
      return;
    }

    if (assignment.arg.toString().trim() !== '') {
      if (directTabText !== '') {
        firstBlankParam = false;
      }
      return;
    }

    if (directTabText !== '' && firstBlankParam) {
      firstBlankParam = false;
      return;
    }

    var text = (assignment.param.isDataRequired) ?
        '<' + assignment.param.name + '>' :
        '[' + assignment.param.name + ']';

    // Add a space if we don't have one at the end of the input or if
    // this isn't the first param we've mentioned
    if (!trailingSeparator || !firstBlankParam) {
      text = '\u00a0' + text; // i.e. &nbsp;
    }

    firstBlankParam = false;
    emptyParameters.push(text);
  }