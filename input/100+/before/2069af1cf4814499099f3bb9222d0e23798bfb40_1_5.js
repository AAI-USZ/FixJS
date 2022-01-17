function(name) {
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
  }