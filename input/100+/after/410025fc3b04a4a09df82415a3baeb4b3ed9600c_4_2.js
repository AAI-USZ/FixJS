function() {
  var input = this.inputter.getInputState();

  // directTabText is for when the current input is a prefix of the completion
  // arrowTabText is for when we need to use an -> to show what will be used
  var directTabText = '';
  var arrowTabText = '';
  if (input.typed.trim().length !== 0) {
    var current = this.inputter.assignment;
    var prediction = current.conversion.getPredictionAt(this.choice);
    if (prediction) {
      var tabText = prediction.name;
      var existing = current.arg.text;

      if (existing !== tabText) {
        // Decide to use directTabText or arrowTabText
        // Strip any leading whitespace from the user inputted value because the
        // tabText will never have leading whitespace.
        var inputValue = existing.replace(/^\s*/, '');
        var isStrictCompletion = tabText.indexOf(inputValue) === 0;
        if (isStrictCompletion && input.cursor.start === input.typed.length) {
          // Display the suffix of the prediction as the completion
          var numLeadingSpaces = existing.match(/^(\s*)/)[0].length;

          directTabText = tabText.slice(existing.length - numLeadingSpaces);
        }
        else {
          // Display the '-> prediction' at the end of the completer element
          // These JS escapes are aka &nbsp;&rarr; the right arrow
          arrowTabText = ' \u00a0\u21E5 ' + tabText;
        }
      }
    }
  }

  // statusMarkup is wrapper around requisition.getInputStatusMarkup converting
  // space to &nbsp; in the string member (for HTML display) and status to an
  // appropriate class name (i.e. lower cased, prefixed with gcli-in-)
  var statusMarkup = this.requisition.getInputStatusMarkup(input.cursor.start);
  statusMarkup.forEach(function(member) {
    member.string = member.string.replace(/ /g, '\u00a0'); // i.e. &nbsp;
    member.className = 'gcli-in-' + member.status.toString().toLowerCase();
  }, this);

  // Calculate the list of parameters to be filled in
  var trailingSeparator = this.requisition.typedEndsWithSeparator();
  // We generate an array of emptyParameter markers for each positional
  // parameter to the current command.
  // Generally each emptyParameter marker begins with a space to separate it
  // from whatever came before, unless what comes before ends in a space.
  // Also if we've got a directTabText prediction then we don't want any text
  // for that parameter at all. The algorithm to add spaces need to take this
  // into account.

  var firstBlankParam = true;
  var emptyParameters = [];
  this.requisition.getAssignments().forEach(function(assignment) {
    if (!assignment.param.isPositionalAllowed) {
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
  }.bind(this));

  var command = this.requisition.commandAssignment.value;
  var jsCommand = command && command.name === '{';

  // Is the entered command a JS command with no closing '}'?
  // TWEAK: This code should be considered for promotion to Requisition
  var unclosedJs = jsCommand &&
      this.requisition.getAssignment(0).arg.suffix.indexOf('}') === -1;

  // The text for the 'jump to scratchpad' feature, or '' if it is disabled
  var link = this.scratchpad && jsCommand ? this.scratchpad.linkText : '';

  return {
    statusMarkup: statusMarkup,
    directTabText: directTabText,
    emptyParameters: emptyParameters,
    arrowTabText: arrowTabText,
    unclosedJs: unclosedJs,
    scratchLink: link
  }};
