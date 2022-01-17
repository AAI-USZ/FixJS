function(cursor, predictionChoice) {
  var assignment = this.getAssignmentAt(cursor.start);

  var predictions = assignment.conversion.getPredictions();
  if (predictions.length > 0) {
    this.onTextChange.holdFire();

    var prediction = assignment.conversion.getPredictionAt(predictionChoice);

    // Mutate this argument to hold the completion
    var arg = assignment.arg.beget(prediction.name);
    var conversion = assignment.param.type.parse(arg);
    assignment.setConversion(conversion);

    // If this argument isn't assigned to anything (i.e. it was created by
    // assignment.setBlank) we need to add it into the _args array so
    // requisition.toString can make sense
    if (this._args.indexOf(arg) === -1) {
      this._args.push(arg);
    }

    if (prediction.incomplete) {
      // This is the easy case - the prediction is incomplete - no need to add
      // any spaces
      return;
    }

    // The prediction reported !incomplete, which means it's complete so we
    // should add a space to delimit this argument and let the user move-on.
    // The question is, where does the space go? The obvious thing to do is to
    // add it to the suffix of the completed argument, but that's wrong because
    // spaces are attached to the start of the next argument rather than the
    // end of the previous one (and this matters to getCurrentAssignment).
    // However there might not be a next argument (if we've at the end of the
    // input), in which case we really do use this one.
    // Also if there is already a space in those positions, don't add another

    var nextIndex = assignment.paramIndex + 1;
    var nextAssignment = this.getAssignment(nextIndex);
    if (nextAssignment) {
      // Add a space onto the next argument (if there isn't one there already)
      var nextArg = nextAssignment.conversion.arg;
      if (nextArg.prefix.charAt(0) !== ' ') {
        nextArg.prefix = ' ' + nextArg.prefix;
        var nextConversion = nextAssignment.param.type.parse(nextArg);
        nextAssignment.setConversion(nextConversion);

        // If this argument isn't assigned to anything (i.e. it was created by
        // assignment.setBlank) we need to add it into the _args array so
        // requisition.toString can make sense
        if (this._args.indexOf(nextArg) === -1) {
          this._args.push(nextArg);
        }
      }
    }
    else {
      // There is no next argument, this must be the last assignment, so just
      // add the space to the prefix of this argument
      var conversion = assignment.conversion;
      var arg = conversion.arg;
      if (arg.suffix.charAt(arg.suffix.length - 1) !== ' ') {
        arg.suffix = arg.suffix + ' ';

        // It's tempting to think - "we're calling setConversion twice in one
        // call to complete, the first time to complete the text, the second
        // to add a space, why not save the event cascade and do it once"
        // However if we're setting up the command, the number of parameters
        // changes as a result, so our call to getAssignment(nextIndex) will
        // produce the wrong answer
        assignment.setConversion(conversion);
      }
    }

    this.onTextChange();
    this.onTextChange.resumeFire();
  }
}