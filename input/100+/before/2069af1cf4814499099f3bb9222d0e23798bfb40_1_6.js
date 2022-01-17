function(args) {
  this._unassigned = [];

  if (!this.commandAssignment.value) {
    this._addUnassignedArgs(args);
    return;
  }

  if (args.length === 0) {
    this.setBlankArguments();
    return;
  }

  // Create an error if the command does not take parameters, but we have
  // been given them ...
  if (this.assignmentCount === 0) {
    this._addUnassignedArgs(args);
    return;
  }

  // Special case: if there is only 1 parameter, and that's of type
  // text, then we put all the params into the first param
  if (this.assignmentCount === 1) {
    var assignment = this.getAssignment(0);
    if (assignment.param.type instanceof StringType) {
      var arg = (args.length === 1) ?
        args[0] :
        new MergedArgument(args);
      var conversion = assignment.param.type.parse(arg);
      assignment.setConversion(conversion);
      return;
    }
  }

  // Positional arguments can still be specified by name, but if they are
  // then we need to ignore them when working them out positionally
  var names = this.getParameterNames();

  // We collect the arguments used in arrays here before assigning
  var arrayArgs = {};

  // Extract all the named parameters
  this.getAssignments(false).forEach(function(assignment) {
    // Loop over the arguments
    // Using while rather than loop because we remove args as we go
    var i = 0;
    while (i < args.length) {
      if (assignment.param.isKnownAs(args[i].text)) {
        var arg = args.splice(i, 1)[0];
        names = names.filter(function(test) {
          return test !== assignment.param.name;
        });

        // boolean parameters don't have values, default to false
        if (assignment.param.type instanceof BooleanType) {
          arg = new TrueNamedArgument(null, arg);
        }
        else {
          // TODO: We probably need to check that the next param doesn't look
          // like a named parameter
          var valueArg = null;
          if (i + 1 >= args.length) {
            valueArg = args.splice(i, 1)[0];
          }
          arg = new NamedArgument(arg, valueArg);
        }

        if (assignment.param.type instanceof ArrayType) {
          var arrayArg = arrayArgs[assignment.param.name];
          if (!arrayArg) {
            arrayArg = new ArrayArgument();
            arrayArgs[assignment.param.name] = arrayArg;
          }
          arrayArg.addArgument(arg);
        }
        else {
          var conversion = assignment.param.type.parse(arg);
          assignment.setConversion(conversion);
        }
      }
      else {
        // Skip this parameter and handle as a positional parameter
        i++;
      }
    }
  }, this);

  // What's left are positional parameters assign in order
  names.forEach(function(name) {
    var assignment = this.getAssignment(name);

    // If not set positionally, and we can't set it non-positionally,
    // we have to default it to prevent previous values surviving
    if (!assignment.param.isPositionalAllowed) {
      assignment.setBlank();
      return;
    }

    // If this is a positional array argument, then it swallows the
    // rest of the arguments.
    if (assignment.param.type instanceof ArrayType) {
      var arrayArg = arrayArgs[assignment.param.name];
      if (!arrayArg) {
        arrayArg = new ArrayArgument();
        arrayArgs[assignment.param.name] = arrayArg;
      }
      arrayArg.addArguments(args);
      args = [];
    }
    else {
      if (args.length === 0) {
        assignment.setBlank();
      }
      else {
        var arg = args.splice(0, 1)[0];
        // --foo and -f are named parameters, -4 is a number. So '-' is either
        // the start of a named parameter or a number depending on the context
        var isIncompleteName = assignment.param.type instanceof NumberType ?
            /-[-a-zA-Z_]/.test(arg.text) :
            arg.text.charAt(0) === '-';

        if (isIncompleteName) {
          this._unassigned.push(new UnassignedAssignment(arg, true));
        }
        else {
          var conversion = assignment.param.type.parse(arg);
          assignment.setConversion(conversion);
        }
      }
    }
  }, this);

  // Now we need to assign the array argument (if any)
  Object.keys(arrayArgs).forEach(function(name) {
    var assignment = this.getAssignment(name);
    var conversion = assignment.param.type.parse(arrayArgs[name]);
    assignment.setConversion(conversion);
  }, this);

  this._addUnassignedArgs(args);
}