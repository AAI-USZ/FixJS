function(require, exports, module) {


var util = require('gcli/util');
var view = require('gcli/ui/view');

var canon = require('gcli/canon');
var Promise = require('gcli/promise').Promise;

var Status = require('gcli/types').Status;
var Conversion = require('gcli/types').Conversion;
var ArrayType = require('gcli/types/basic').ArrayType;
var StringType = require('gcli/types/basic').StringType;
var BooleanType = require('gcli/types/basic').BooleanType;

var Argument = require('gcli/argument').Argument;
var ArrayArgument = require('gcli/argument').ArrayArgument;
var NamedArgument = require('gcli/argument').NamedArgument;
var TrueNamedArgument = require('gcli/argument').TrueNamedArgument;
var MergedArgument = require('gcli/argument').MergedArgument;
var ScriptArgument = require('gcli/argument').ScriptArgument;

var evalCommand;

/**
 * Registration and de-registration.
 */
exports.startup = function() {
  evalCommand = canon.addCommand(evalCommandSpec);
};

exports.shutdown = function() {
  canon.removeCommand(evalCommandSpec.name);
  evalCommand = undefined;
};


/**
 * Assignment is a link between a parameter and the data for that parameter.
 * The data for the parameter is available as in the preferred type and as
 * an Argument for the CLI.
 * <p>We also record validity information where applicable.
 * <p>For values, null and undefined have distinct definitions. null means
 * that a value has been provided, undefined means that it has not.
 * Thus, null is a valid default value, and common because it identifies an
 * parameter that is optional. undefined means there is no value from
 * the command line.
 *
 * <h2>Events<h2>
 * Assignment publishes the following event:<ul>
 * <li>onAssignmentChange: Either the value or the text has changed. It is
 * likely that any UI component displaying this argument will need to be
 * updated.
 * The event object looks like:
 * <tt>{ assignment: ..., conversion: ..., oldConversion: ... }</tt>
 * @constructor
 */
function Assignment(param, paramIndex) {
  // The parameter that we are assigning to
  this.param = param;

  this.conversion = undefined;

  // The index of this parameter in the parent Requisition. paramIndex === -1
  // is the command assignment although this should not be relied upon, it is
  // better to test param instanceof CommandAssignment
  this.paramIndex = paramIndex;

  this.onAssignmentChange = util.createEvent('Assignment.onAssignmentChange');

  this.setBlank();
}

/**
 * Easy accessor for conversion.arg.
 * This is a read-only property because writes to arg should be done through
 * the 'conversion' property.
 */
Object.defineProperty(Assignment.prototype, 'arg', {
  get: function() {
    return this.conversion.arg;
  },
  enumerable: true
});

/**
 * Easy accessor for conversion.value.
 * This is a read-only property because writes to value should be done through
 * the 'conversion' property.
 */
Object.defineProperty(Assignment.prototype, 'value', {
  get: function() {
    return this.conversion.value;
  },
  enumerable: true
});

/**
 * Easy (and safe) accessor for conversion.message
 */
Assignment.prototype.getMessage = function() {
  return this.conversion.message ? this.conversion.message : '';
};

/**
 * Easy (and safe) accessor for conversion.getPredictions()
 * @return An array of objects with name and value elements. For example:
 * [ { name:'bestmatch', value:foo1 }, { name:'next', value:foo2 }, ... ]
 */
Assignment.prototype.getPredictions = function() {
  return this.conversion.getPredictions();
};

/**
 * Report on the status of the last parse() conversion.
 * We force mutations to happen through this method rather than have
 * setValue and setArgument functions to help maintain integrity when we
 * have ArrayArguments and don't want to get confused. This way assignments
 * are just containers for a conversion rather than things that store
 * a connection between an arg/value.
 * @see types.Conversion
 */
Assignment.prototype.setConversion = function(conversion) {
  var oldConversion = this.conversion;

  this.conversion = conversion;
  this.conversion.assign(this);

  if (this.conversion.equals(oldConversion)) {
    return;
  }

  this.onAssignmentChange({
    assignment: this,
    conversion: this.conversion,
    oldConversion: oldConversion
  });
};

/**
 * Setup an empty value for the conversion by parsing an empty argument.
 */
Assignment.prototype.setBlank = function() {
  this.setConversion(this.param.type.getBlank());
};

/**
 * Make sure that there is some content for this argument by using an
 * Argument of '' if needed.
 */
Assignment.prototype.ensureVisibleArgument = function() {
  // It isn't clear if we should be sending events from this method.
  // It should only be called when structural changes are happening in which
  // case we're going to ignore the event anyway. But on the other hand
  // perhaps this function shouldn't need to know how it is used, and should
  // do the inefficient thing.
  if (this.conversion.arg.type !== 'BlankArgument') {
    return false;
  }

  var arg = this.conversion.arg.beget('', {
    prefixSpace: this.param instanceof CommandAssignment
  });
  this.conversion = this.param.type.parse(arg);
  this.conversion.assign(this);

  return true;
};

/**
 * Work out what the status of the current conversion is which involves looking
 * not only at the conversion, but also checking if data has been provided
 * where it should.
 * @param arg For assignments with multiple args (e.g. array assignments) we
 * can narrow the search for status to a single argument.
 */
Assignment.prototype.getStatus = function(arg) {
  if (this.param.isDataRequired && !this.conversion.isDataProvided()) {
    return Status.ERROR;
  }

  // Selection/Boolean types with a defined range of values will say that
  // '' is INCOMPLETE, but the parameter may be optional, so we don't ask
  // if the user doesn't need to enter something and hasn't done so.
  if (!this.param.isDataRequired && this.arg.type === 'BlankArgument') {
    return Status.VALID;
  }

  return this.conversion.getStatus(arg);
};

/**
 * Replace the current value with the lower value if such a concept exists.
 */
Assignment.prototype.decrement = function() {
  var replacement = this.param.type.decrement(this.conversion.value);
  if (replacement != null) {
    var str = this.param.type.stringify(replacement);
    var arg = this.conversion.arg.beget(str);
    var conversion = new Conversion(replacement, arg);
    this.setConversion(conversion);
  }
};

/**
 * Replace the current value with the higher value if such a concept exists.
 */
Assignment.prototype.increment = function() {
  var replacement = this.param.type.increment(this.conversion.value);
  if (replacement != null) {
    var str = this.param.type.stringify(replacement);
    var arg = this.conversion.arg.beget(str);
    var conversion = new Conversion(replacement, arg);
    this.setConversion(conversion);
  }
};

/**
 * Helper when we're rebuilding command lines.
 */
Assignment.prototype.toString = function() {
  return this.conversion.toString();
};

/**
 * For test/debug use only. The output from this function is subject to wanton
 * random change without notice, and should not be relied upon to even exist
 * at some later date.
 */
Object.defineProperty(Assignment.prototype, '_summaryJson', {
  get: function() {
    return {
      param: this.param.name + '/' + this.param.type.name,
      defaultValue: this.param.defaultValue,
      arg: this.conversion.arg._summaryJson,
      value: this.value,
      message: this.getMessage(),
      status: this.getStatus().toString(),
      predictionCount: this.getPredictions().length
    };
  },
  enumerable: true
});

exports.Assignment = Assignment;


/**
 * How to dynamically execute JavaScript code
 */
var customEval = eval;

/**
 * Setup a function to be called in place of 'eval', generally for security
 * reasons
 */
exports.setEvalFunction = function(newCustomEval) {
  customEval = newCustomEval;
};

/**
 * Remove the binding done by setEvalFunction().
 * We purposely set customEval to undefined rather than to 'eval' because there
 * is an implication of setEvalFunction that we're in a security sensitive
 * situation. What if we can trick GCLI into calling unsetEvalFunction() at the
 * wrong time?
 * So to properly undo the effects of setEvalFunction(), you need to call
 * setEvalFunction(eval) rather than unsetEvalFunction(), however the latter is
 * preferred in most cases.
 */
exports.unsetEvalFunction = function() {
  customEval = undefined;
};

/**
 * 'eval' command
 */
var evalCommandSpec = {
  name: '{',
  params: [
    {
      name: 'javascript',
      type: 'javascript',
      description: ''
    }
  ],
  hidden: true,
  returnType: 'object',
  description: { key: 'cliEvalJavascript' },
  exec: function(args, context) {
    return customEval(args.javascript);
  },
  evalRegexp: /^\s*{\s*/
};


/**
 * This is a special assignment to reflect the command itself.
 */
function CommandAssignment() {
  var commandParamMetadata = { name: '__command', type: 'command' };
  // This is a hack so that rather than reply with a generic description of the
  // command assignment, we reply with the description of the assigned command,
  // (using a generic term if there is no assigned command)
  var self = this;
  Object.defineProperty(commandParamMetadata, 'description', {
    get: function() {
      var value = self.value;
      return value && value.description ?
          value.description :
          'The command to execute';
    },
    enumerable: true
  });
  this.param = new canon.Parameter(commandParamMetadata);
  this.paramIndex = -1;
  this.onAssignmentChange = util.createEvent('CommandAssignment.onAssignmentChange');

  this.setBlank();
}

CommandAssignment.prototype = Object.create(Assignment.prototype);

CommandAssignment.prototype.getStatus = function(arg) {
  return Status.combine(
    Assignment.prototype.getStatus.call(this, arg),
    this.conversion.value && this.conversion.value.exec ?
            Status.VALID : Status.INCOMPLETE
  );
};

exports.CommandAssignment = CommandAssignment;


/**
 * Special assignment used when ignoring parameters that don't have a home
 */
function UnassignedAssignment() {
  this.param = new canon.Parameter({
    name: '__unassigned',
    type: 'string'
  });
  this.paramIndex = -1;
  this.onAssignmentChange = util.createEvent('UnassignedAssignment.onAssignmentChange');

  this.setBlank();
}

UnassignedAssignment.prototype = Object.create(Assignment.prototype);

UnassignedAssignment.prototype.getStatus = function(arg) {
  return Status.ERROR;
};

UnassignedAssignment.prototype.setUnassigned = function(args) {
  if (!args || args.length === 0) {
    this.setBlank();
  }
  else {
    var conversion = this.param.type.parse(new MergedArgument(args));
    this.setConversion(conversion);
  }
};


/**
 * A Requisition collects the information needed to execute a command.
 *
 * (For a definition of the term, see http://en.wikipedia.org/wiki/Requisition)
 * This term is used because carries the notion of a work-flow, or process to
 * getting the information to execute a command correct.
 * There is little point in a requisition for parameter-less commands because
 * there is no information to collect. A Requisition is a collection of
 * assignments of values to parameters, each handled by an instance of
 * Assignment.
 *
 * <h2>Events<h2>
 * <p>Requisition publishes the following events:
 * <ul>
 * <li>onAssignmentChange: This is a forward of the onAssignmentChange event on
 * Assignment. It is fired when any assignment (except the commandAssignment)
 * changes.
 * <li>onTextChange: The text to be mirrored in a command line has changed.
 * </ul>
 *
 * @param environment An optional opaque object passed to commands in the
 * Execution Context.
 * @param doc A DOM Document passed to commands using the Execution Context in
 * order to allow creation of DOM nodes. If missing Requisition will use the
 * global 'document'.
 * @constructor
 */
function Requisition(environment, doc) {
  this.environment = environment;
  this.document = doc;
  if (this.document == null) {
    try {
      this.document = document;
    }
    catch (ex) {
      // Ignore
    }
  }

  // The command that we are about to execute.
  // @see setCommandConversion()
  this.commandAssignment = new CommandAssignment();

  // The object that stores of Assignment objects that we are filling out.
  // The Assignment objects are stored under their param.name for named
  // lookup. Note: We make use of the property of Javascript objects that
  // they are not just hashmaps, but linked-list hashmaps which iterate in
  // insertion order.
  // _assignments excludes the commandAssignment.
  this._assignments = {};

  // The count of assignments. Excludes the commandAssignment
  this.assignmentCount = 0;

  // Used to store cli arguments in the order entered on the cli
  this._args = [];

  // Used to store cli arguments that were not assigned to parameters
  this._unassigned = new UnassignedAssignment();

  // Temporarily set this to true to prevent _assignmentChanged resetting
  // argument positions
  this._structuralChangeInProgress = false;

  this.commandAssignment.onAssignmentChange.add(this._commandAssignmentChanged, this);
  this.commandAssignment.onAssignmentChange.add(this._assignmentChanged, this);

  this.commandOutputManager = canon.commandOutputManager;

  this.onAssignmentChange = util.createEvent('Requisition.onAssignmentChange');
  this.onTextChange = util.createEvent('Requisition.onTextChange');
}

/**
 * Some number that is higher than the most args we'll ever have. Would use
 * MAX_INTEGER if that made sense
 */
var MORE_THAN_THE_MOST_ARGS_POSSIBLE = 1000000;

/**
 * Avoid memory leaks
 */
Requisition.prototype.destroy = function() {
  this.commandAssignment.onAssignmentChange.remove(this._commandAssignmentChanged, this);
  this.commandAssignment.onAssignmentChange.remove(this._assignmentChanged, this);

  delete this.document;
  delete this.environment;
};

/**
 * When any assignment changes, we might need to update the _args array to
 * match and inform people of changes to the typed input text.
 */
Requisition.prototype._assignmentChanged = function(ev) {
  // Don't report an event if the value is unchanged
  if (ev.oldConversion != null &&
      ev.conversion.valueEquals(ev.oldConversion)) {
    return;
  }

  if (this._structuralChangeInProgress) {
    return;
  }

  this.onAssignmentChange(ev);

  // Both for argument position and the onTextChange event, we only care
  // about changes to the argument.
  if (ev.conversion.argEquals(ev.oldConversion)) {
    return;
  }

  this._structuralChangeInProgress = true;

  // Refactor? See bug 660765
  // Do preceding arguments need to have dummy values applied so we don't
  // get a hole in the command line?
  var i;
  if (ev.assignment.param.isPositionalAllowed) {
    for (i = 0; i < ev.assignment.paramIndex; i++) {
      var assignment = this.getAssignment(i);
      if (assignment.param.isPositionalAllowed) {
        if (assignment.ensureVisibleArgument()) {
          this._args.push(assignment.arg);
        }
      }
    }
  }

  // Remember where we found the first match
  var index = MORE_THAN_THE_MOST_ARGS_POSSIBLE;
  for (i = 0; i < this._args.length; i++) {
    if (this._args[i].assignment === ev.assignment) {
      if (i < index) {
        index = i;
      }
      this._args.splice(i, 1);
      i--;
    }
  }

  if (index === MORE_THAN_THE_MOST_ARGS_POSSIBLE) {
    this._args.push(ev.assignment.arg);
  }
  else {
    // Is there a way to do this that doesn't involve a loop?
    var newArgs = ev.conversion.arg.getArgs();
    for (i = 0; i < newArgs.length; i++) {
      this._args.splice(index + i, 0, newArgs[i]);
    }
  }
  this._structuralChangeInProgress = false;

  this.onTextChange();
};

/**
 * When the command changes, we need to keep a bunch of stuff in sync
 */
Requisition.prototype._commandAssignmentChanged = function(ev) {
  // Assignments fire AssignmentChange events on any change, including minor
  // things like whitespace change in arg prefix, so we ignore anything but
  // an actual value change
  if (ev.conversion.valueEquals(ev.oldConversion)) {
    return;
  }

  this._assignments = {};

  var command = this.commandAssignment.value;
  if (command) {
    for (var i = 0; i < command.params.length; i++) {
      var param = command.params[i];
      var assignment = new Assignment(param, i);
      assignment.onAssignmentChange.add(this._assignmentChanged, this);
      this._assignments[param.name] = assignment;
    }
  }
  this.assignmentCount = Object.keys(this._assignments).length;
};

/**
 * Assignments have an order, so we need to store them in an array.
 * But we also need named access ...
 * @return The found assignment, or undefined, if no match was found
 */
Requisition.prototype.getAssignment = function(nameOrNumber) {
  var name = (typeof nameOrNumber === 'string') ?
    nameOrNumber :
    Object.keys(this._assignments)[nameOrNumber];
  return this._assignments[name] || undefined;
};

/**
 * Where parameter name == assignment names - they are the same
 */
Requisition.prototype.getParameterNames = function() {
  return Object.keys(this._assignments);
};

/**
 * A *shallow* clone of the assignments.
 * This is useful for systems that wish to go over all the assignments
 * finding values one way or another and wish to trim an array as they go.
 */
Requisition.prototype.cloneAssignments = function() {
  return Object.keys(this._assignments).map(function(name) {
    return this._assignments[name];
  }, this);
};

/**
 * The overall status is the most severe status.
 * There is no such thing as an INCOMPLETE overall status because the
 * definition of INCOMPLETE takes into account the cursor position to say 'this
 * isn't quite ERROR because the user can fix it by typing', however overall,
 * this is still an error status.
 */
Requisition.prototype.getStatus = function() {
  var status = Status.VALID;
  if (this._unassigned.arg.type !== 'BlankArgument') {
    return Status.ERROR;
  }
  this.getAssignments(true).forEach(function(assignment) {
    var assignStatus = assignment.getStatus();
    if (assignStatus > status) {
      status = assignStatus;
    }
  }, this);
  if (status === Status.INCOMPLETE) {
    status = Status.ERROR;
  }
  return status;
};

/**
 * Extract the names and values of all the assignments, and return as
 * an object.
 */
Requisition.prototype.getArgsObject = function() {
  var args = {};
  this.getAssignments().forEach(function(assignment) {
    args[assignment.param.name] = assignment.conversion.isDataProvided() ?
            assignment.value :
            assignment.param.defaultValue;
  }, this);
  return args;
};

/**
 * Access the arguments as an array.
 * @param includeCommand By default only the parameter arguments are
 * returned unless (includeCommand === true), in which case the list is
 * prepended with commandAssignment.arg
 */
Requisition.prototype.getAssignments = function(includeCommand) {
  var assignments = [];
  if (includeCommand === true) {
    assignments.push(this.commandAssignment);
  }
  Object.keys(this._assignments).forEach(function(name) {
    assignments.push(this.getAssignment(name));
  }, this);
  return assignments;
};

/**
 * Reset all the assignments to their default values
 */
Requisition.prototype.setBlankArguments = function() {
  this.getAssignments().forEach(function(assignment) {
    assignment.setBlank();
  }, this);
};

/**
 * Complete the argument at <tt>cursor</tt>.
 * Basically the same as:
 *   assignment = getAssignmentAt(cursor);
 *   assignment.value = assignment.conversion.predictions[0];
 * Except it's done safely, and with particular care to where we place the
 * space, which is complex, and annoying if we get it wrong.
 * @param cursor The cursor configuration. Should have start and end properties
 * which should be set to start and end of the selection.
 * @param predictionChoice The index of the prediction that we should choose.
 * This number is not bounded by the size of the prediction array, we take the
 * modulus to get it within bounds
 */
Requisition.prototype.complete = function(cursor, predictionChoice) {
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
};

/**
 * Extract a canonical version of the input
 */
Requisition.prototype.toCanonicalString = function() {
  var line = [];

  var cmd = this.commandAssignment.value ?
      this.commandAssignment.value.name :
      this.commandAssignment.arg.text;
  line.push(cmd);

  Object.keys(this._assignments).forEach(function(name) {
    var assignment = this._assignments[name];
    var type = assignment.param.type;
    // Bug 664377: This will cause problems if there is a non-default value
    // after a default value. Also we need to decide when to use
    // named parameters in place of positional params. Both can wait.
    if (assignment.value !== assignment.param.defaultValue) {
      line.push(' ');
      line.push(type.stringify(assignment.value));
    }
  }, this);

  // Canonically, if we've opened with a { then we should have a } to close
  if (cmd === '{') {
    if (this.getAssignment(0).arg.suffix.indexOf('}') === -1) {
      line.push(' }');
    }
  }

  return line.join('');
};

/**
 * Input trace gives us an array of Argument tracing objects, one for each
 * character in the typed input, from which we can derive information about how
 * to display this typed input. It's a bit like toString on steroids.
 * <p>
 * The returned object has the following members:<ul>
 * <li>char: The character to which this arg trace refers.
 * <li>arg: The Argument to which this character is assigned.
 * <li>part: One of ['prefix'|'text'|suffix'] - how was this char understood
 * </ul>
 * <p>
 * The Argument objects are as output from #_tokenize() rather than as applied
 * to Assignments by #_assign() (i.e. they are not instances of NamedArgument,
 * ArrayArgument, etc).
 * <p>
 * To get at the arguments applied to the assignments simply call
 * <tt>arg.assignment.arg</tt>. If <tt>arg.assignment.arg !== arg</tt> then
 * the arg applied to the assignment will contain the original arg.
 * See #_assign() for details.
 */
Requisition.prototype.createInputArgTrace = function() {
  if (!this._args) {
    throw new Error('createInputMap requires a command line. See source.');
    // If this is a problem then we can fake command line input using
    // something like the code in #toCanonicalString().
  }

  var args = [];
  var i;
  this._args.forEach(function(arg) {
    for (i = 0; i < arg.prefix.length; i++) {
      args.push({ arg: arg, char: arg.prefix[i], part: 'prefix' });
    }
    for (i = 0; i < arg.text.length; i++) {
      args.push({ arg: arg, char: arg.text[i], part: 'text' });
    }
    for (i = 0; i < arg.suffix.length; i++) {
      args.push({ arg: arg, char: arg.suffix[i], part: 'suffix' });
    }
  });

  return args;
};

/**
 * Reconstitute the input from the args
 */
Requisition.prototype.toString = function() {
  if (this._args) {
    return this._args.map(function(arg) {
      return arg.toString();
    }).join('');
  }

  return this.toCanonicalString();
};

/**
 * If the last character is whitespace then things that we suggest to add to
 * the end don't need a space prefix.
 * While this is quite a niche function, it has 2 benefits:
 * - it's more correct because we can distinguish between final whitespace that
 *   is part of an unclosed string, and parameter separating whitespace.
 * - also it's faster than toString() the whole thing and checking the end char
 * @return true iff the last character is interpreted as parameter separating
 * whitespace
 */
Requisition.prototype.typedEndsWithWhitespace = function() {
  if (this._args) {
    return this._args.slice(-1)[0].suffix.slice(-1) === ' ';
  }

  return this.toCanonicalString().slice(-1) === ' ';
};

/**
 * Return an array of Status scores so we can create a marked up
 * version of the command line input.
 * @param cursor We only take a status of INCOMPLETE to be INCOMPLETE when the
 * cursor is actually in the argument. Otherwise it's an error.
 * @return Array of objects each containing <tt>status</tt> property and a
 * <tt>string</tt> property containing the characters to which the status
 * applies. Concatenating the strings in order gives the original input.
 */
Requisition.prototype.getInputStatusMarkup = function(cursor) {
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
        // If the cursor is not in a position to be able to complete it
        if (arg !== cTrace.arg || cTrace.part !== 'text') {
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
};

/**
 * Look through the arguments attached to our assignments for the assignment
 * at the given position.
 * @param {number} cursor The cursor position to query
 */
Requisition.prototype.getAssignmentAt = function(cursor) {
  if (!this._args) {
    console.trace();
    throw new Error('Missing args');
  }

  // We short circuit this one because we may have no args, or no args with
  // any size and the alg below only finds arguments with size.
  if (cursor === 0) {
    return this.commandAssignment;
  }

  var assignForPos = [];
  var i, j;
  for (i = 0; i < this._args.length; i++) {
    var arg = this._args[i];
    var assignment = arg.assignment;

    // prefix and text are clearly part of the argument
    for (j = 0; j < arg.prefix.length; j++) {
      assignForPos.push(assignment);
    }
    for (j = 0; j < arg.text.length; j++) {
      assignForPos.push(assignment);
    }

    // suffix looks forwards
    if (this._args.length > i + 1) {
      // first to the next argument
      assignment = this._args[i + 1].assignment;
    }
    else if (assignment &&
        assignment.paramIndex + 1 < this.assignmentCount) {
      // then to the next assignment
      assignment = this.getAssignment(assignment.paramIndex + 1);
    }

    for (j = 0; j < arg.suffix.length; j++) {
      assignForPos.push(assignment);
    }
  }

  // Possible shortcut, we don't really need to go through all the args
  // to work out the solution to this

  var reply = assignForPos[cursor - 1];

  if (!reply) {
    throw new Error('Missing assignment.' +
        ' cursor=' + cursor + ' text=' + this.toString());
  }

  return reply;
};

/**
 * Entry point for keyboard accelerators or anything else that wants to execute
 * a command. There are 3 ways to call <tt>exec()</tt>:
 * 1. Without any parameters. This assumes that the command to be executed has
 *    already been parsed by the requisition using <tt>update()</tt>.
 * 2. With a string parameter, or an object with a 'typed' property. This is
 *    effectively a shortcut for calling <tt>update(typed); exec();</tt>
 * 3. With input having a 'command' property which is either a command object
 *    (i.e. from canon.getCommand) or a string which can be passed to
 *    canon.getCommand() plus and optional 'args' property which contains the
 *    argument values as passed to command.exec. This method is significantly
 *    faster, and designed for use from keyboard shortcuts.
 * In addition to these properties, the input parameter can contain a 'hidden'
 * property which can be set to true to hide the output from the
 * CommandOutputManager.
 * @param input (optional) The command to execute. See above.
 */
Requisition.prototype.exec = function(input) {
  var command;
  var args;
  var hidden = false;
  if (input && input.hidden) {
    hidden = true;
  }

  if (input) {
    if (typeof input === 'string') {
      this.update(input);
    }
    else if (typeof input.typed === 'string') {
      this.update(input.typed);
    }
    else if (input.command != null) {
      // Fast track by looking up the command directly since passed args
      // means there is no command line to parse.
      command = canon.getCommand(input.command);
      if (!command) {
        console.error('Command not found: ' + input.command);
      }
      args = input.args;
    }
  }

  if (!command) {
    command = this.commandAssignment.value;
    args = this.getArgsObject();
  }

  if (!command) {
    throw new Error('Unknown command');
  }

  // Display JavaScript input without the initial { or closing }
  var typed = this.toString();
  if (evalCommandSpec.evalRegexp.test(typed)) {
    typed = typed.replace(evalCommandSpec.evalRegexp, '');
    // Bug 717763: What if the JavaScript naturally ends with a }?
    typed = typed.replace(/\s*}\s*$/, '');
  }

  var output = new Output({
    command: command,
    args: args,
    typed: typed,
    canonical: this.toCanonicalString(),
    hidden: hidden
  });

  this.commandOutputManager.onOutput({ output: output });

  try {
    var context = exports.createExecutionContext(this);
    var reply = command.exec(args, context);

    if (reply != null && reply.isPromise) {
      reply.then(
          function(data) { output.complete(data); },
          function(error) { output.error = true; output.complete(error); });

      output.promise = reply;
      // Add progress to our promise and add a handler for it here
      // See bug 659300
    }
    else {
      output.complete(reply);
    }
  }
  catch (ex) {
    console.error(ex);
    output.error = true;
    output.complete(ex);
  }

  this.update('');
  return output;
};

/**
 * Called by the UI when ever the user interacts with a command line input
 * @param typed The contents of the input field
 */
Requisition.prototype.update = function(typed) {
  this._structuralChangeInProgress = true;

  this._args = this._tokenize(typed);
  var args = this._args.slice(0); // i.e. clone
  this._split(args);
  this._assign(args);

  this._structuralChangeInProgress = false;
  this.onTextChange();
};

/**
 * For test/debug use only. The output from this function is subject to wanton
 * random change without notice, and should not be relied upon to even exist
 * at some later date.
 */
Object.defineProperty(Requisition.prototype, '_summaryJson', {
  get: function() {
    var summary = {
      $args: this._args.map(function(arg) {
        return arg._summaryJson;
      }),
      _command: this.commandAssignment._summaryJson,
      _unassigned: this._unassigned._summaryJson
    };

    Object.keys(this._assignments).forEach(function(name) {
      summary[name] = this.getAssignment(name)._summaryJson;
    }.bind(this));

    return summary;
  },
  enumerable: true
});

/**
 * Requisition._tokenize() is a state machine. These are the states.
 */
var In = {
  /**
   * The last character was ' '.
   * Typing a ' ' character will not change the mode
   * Typing one of '"{ will change mode to SINGLE_Q, DOUBLE_Q or SCRIPT.
   * Anything else goes into SIMPLE mode.
   */
  WHITESPACE: 1,

  /**
   * The last character was part of a parameter.
   * Typing ' ' returns to WHITESPACE mode. Any other character
   * (including '"{} which are otherwise special) does not change the mode.
   */
  SIMPLE: 2,

  /**
   * We're inside single quotes: '
   * Typing ' returns to WHITESPACE mode. Other characters do not change mode.
   */
  SINGLE_Q: 3,

  /**
   * We're inside double quotes: "
   * Typing " returns to WHITESPACE mode. Other characters do not change mode.
   */
  DOUBLE_Q: 4,

  /**
   * We're inside { and }
   * Typing } returns to WHITESPACE mode. Other characters do not change mode.
   * SCRIPT mode is slightly different from other modes in that spaces between
   * the {/} delimiters and the actual input are not considered significant.
   * e.g: " x " is a 3 character string, delimited by double quotes, however
   * { x } is a 1 character JavaScript surrounded by whitespace and {}
   * delimiters.
   * In the short term we assume that the JS routines can make sense of the
   * extra whitespace, however at some stage we may need to move the space into
   * the Argument prefix/suffix.
   * Also we don't attempt to handle nested {}. See bug 678961
   */
  SCRIPT: 5
}
/**
 * Split up the input taking into account ', " and {.
 * We don't consider \t or other classical whitespace characters to split
 * arguments apart. For one thing these characters are hard to type, but also
 * if the user has gone to the trouble of pasting a TAB character into the
 * input field (or whatever it takes), they probably mean it.
 */
Requisition.prototype._tokenize = function(typed) {
  // For blank input, place a dummy empty argument into the list
  if (typed == null || typed.length === 0) {
    return [ new Argument('', '', '') ];
  }

  if (isSimple(typed)) {
    return [ new Argument(typed, '', '') ];
  }

  var mode = In.WHITESPACE;

  // First we un-escape. This list was taken from:
  // https://developer.mozilla.org/en/Core_JavaScript_1.5_Guide/Core_Language_Features#Unicode
  // We are generally converting to their real values except for the strings
  // '\'', '\"', '\ ', '{' and '}' which we are converting to unicode private
  // characters so we can distinguish them from '"', ' ', '{', '}' and ''',
  // which are special. They need swapping back post-split - see unescape2()
  typed = typed
      .replace(/\\\\/g, '\\')
      .replace(/\\b/g, '\b')
      .replace(/\\f/g, '\f')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\v/g, '\v')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\ /g, '\uF000')
      .replace(/\\'/g, '\uF001')
      .replace(/\\"/g, '\uF002')
      .replace(/\\{/g, '\uF003')
      .replace(/\\}/g, '\uF004');

  function unescape2(escaped) {
    return escaped
        .replace(/\uF000/g, ' ')
        .replace(/\uF001/g, '\'')
        .replace(/\uF002/g, '"')
        .replace(/\uF003/g, '{')
        .replace(/\uF004/g, '}');
  }

  var i = 0;          // The index of the current character
  var start = 0;      // Where did this section start?
  var prefix = '';    // Stuff that comes before the current argument
  var args = [];      // The array that we're creating
  var blockDepth = 0; // For JS with nested {}

  // This is just a state machine. We're going through the string char by char
  // The 'mode' is one of the 'In' states. As we go, we're adding Arguments
  // to the 'args' array.

  while (true) {
    var c = typed[i];
    var str;
    switch (mode) {
      case In.WHITESPACE:
        if (c === '\'') {
          prefix = typed.substring(start, i + 1);
          mode = In.SINGLE_Q;
          start = i + 1;
        }
        else if (c === '"') {
          prefix = typed.substring(start, i + 1);
          mode = In.DOUBLE_Q;
          start = i + 1;
        }
        else if (c === '{') {
          prefix = typed.substring(start, i + 1);
          mode = In.SCRIPT;
          blockDepth++;
          start = i + 1;
        }
        else if (/ /.test(c)) {
          // Still whitespace, do nothing
        }
        else {
          prefix = typed.substring(start, i);
          mode = In.SIMPLE;
          start = i;
        }
        break;

      case In.SIMPLE:
        // There is an edge case of xx'xx which we are assuming to
        // be a single parameter (and same with ")
        if (c === ' ') {
          str = unescape2(typed.substring(start, i));
          args.push(new Argument(str, prefix, ''));
          mode = In.WHITESPACE;
          start = i;
          prefix = '';
        }
        break;

      case In.SINGLE_Q:
        if (c === '\'') {
          str = unescape2(typed.substring(start, i));
          args.push(new Argument(str, prefix, c));
          mode = In.WHITESPACE;
          start = i + 1;
          prefix = '';
        }
        break;

      case In.DOUBLE_Q:
        if (c === '"') {
          str = unescape2(typed.substring(start, i));
          args.push(new Argument(str, prefix, c));
          mode = In.WHITESPACE;
          start = i + 1;
          prefix = '';
        }
        break;

      case In.SCRIPT:
        if (c === '{') {
          blockDepth++;
        }
        else if (c === '}') {
          blockDepth--;
          if (blockDepth === 0) {
            str = unescape2(typed.substring(start, i));
            args.push(new ScriptArgument(str, prefix, c));
            mode = In.WHITESPACE;
            start = i + 1;
            prefix = '';
          }
        }
        break;
    }

    i++;

    if (i >= typed.length) {
      // There is nothing else to read - tidy up
      if (mode === In.WHITESPACE) {
        if (i !== start) {
          // There's whitespace at the end of the typed string. Add it to the
          // last argument's suffix, creating an empty argument if needed.
          var extra = typed.substring(start, i);
          var lastArg = args[args.length - 1];
          if (!lastArg) {
            args.push(new Argument('', extra, ''));
          }
          else {
            lastArg.suffix += extra;
          }
        }
      }
      else if (mode === In.SCRIPT) {
        str = unescape2(typed.substring(start, i + 1));
        args.push(new ScriptArgument(str, prefix, ''));
      }
      else {
        str = unescape2(typed.substring(start, i + 1));
        args.push(new Argument(str, prefix, ''));
      }
      break;
    }
  }

  return args;
};

/**
 * If the input has no spaces, quotes, braces or escapes,
 * we can take the fast track.
 */
function isSimple(typed) {
   for (var i = 0; i < typed.length; i++) {
     var c = typed.charAt(i);
     if (c === ' ' || c === '"' || c === '\'' ||
         c === '{' || c === '}' || c === '\\') {
       return false;
     }
   }
   return true;
}

/**
 * Looks in the canon for a command extension that matches what has been
 * typed at the command line.
 */
Requisition.prototype._split = function(args) {
  // Handle the special case of the user typing { javascript(); }
  // We use the hidden 'eval' command directly rather than shift()ing one of
  // the parameters, and parse()ing it.
  var conversion;
  if (args[0].type === 'ScriptArgument') {
    // Special case: if the user enters { console.log('foo'); } then we need to
    // use the hidden 'eval' command
    conversion = new Conversion(evalCommand, new ScriptArgument());
    this.commandAssignment.setConversion(conversion);
    return;
  }

  var argsUsed = 1;

  while (argsUsed <= args.length) {
    var arg = (argsUsed === 1) ?
      args[0] :
      new MergedArgument(args, 0, argsUsed);
    conversion = this.commandAssignment.param.type.parse(arg);

    // We only want to carry on if this command is a parent command,
    // which means that there is a commandAssignment, but not one with
    // an exec function.
    if (!conversion.value || conversion.value.exec) {
      break;
    }

    // Previously we needed a way to hide commands depending context.
    // We have not resurrected that feature yet, but if we do we should
    // insert code here to ignore certain commands depending on the
    // context/environment

    argsUsed++;
  }

  this.commandAssignment.setConversion(conversion);

  for (var i = 0; i < argsUsed; i++) {
    args.shift();
  }

  // This could probably be re-written to consume args as we go
};

/**
 * Work out which arguments are applicable to which parameters.
 */
Requisition.prototype._assign = function(args) {
  if (!this.commandAssignment.value) {
    this._unassigned.setUnassigned(args);
    return;
  }

  if (args.length === 0) {
    this.setBlankArguments();
    this._unassigned.setBlank();
    return;
  }

  // Create an error if the command does not take parameters, but we have
  // been given them ...
  if (this.assignmentCount === 0) {
    this._unassigned.setUnassigned(args);
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
      this._unassigned.setBlank();
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
      var arg = (args.length > 0) ?
          args.splice(0, 1)[0] :
          new BlankArgument();

      var conversion = assignment.param.type.parse(arg);
      assignment.setConversion(conversion);
    }
  }, this);

  // Now we need to assign the array argument (if any)
  Object.keys(arrayArgs).forEach(function(name) {
    var assignment = this.getAssignment(name);
    var conversion = assignment.param.type.parse(arrayArgs[name]);
    assignment.setConversion(conversion);
  }, this);

  this._unassigned.setUnassigned(args);
};

exports.Requisition = Requisition;

/**
 * A simple object to hold information about the output of a command
 */
function Output(options) {
  options = options || {};
  this.command = options.command || '';
  this.args = options.args || {};
  this.typed = options.typed || '';
  this.canonical = options.canonical || '';
  this.hidden = options.hidden === true ? true : false;

  this.data = undefined;
  this.completed = false;
  this.error = false;
  this.start = new Date();

  this.onClose = util.createEvent('Output.onClose');
  this.onChange = util.createEvent('Output.onChange');
}

/**
 * Called when there is data to display
 * @param data
 */
Output.prototype.complete = function(data) {
  this.data = data;

  this.end = new Date();
  this.duration = this.end.getTime() - this.start.getTime();
  this.completed = true;

  this.onChange({ output: this });
};

/**
 * Convert to a DOM element for display.
 * @param element The DOM node to which the data should be written. Existing
 * content of 'element' will be removed before 'outputData' is added.
 */
Output.prototype.toDom = function(element) {
  util.clearElement(element);
  var document = element.ownerDocument;

  var output = this.data;
  if (output == null) {
    return;
  }

  var node;
  if (typeof HTMLElement !== 'undefined' && output instanceof HTMLElement) {
    node = output;
  }
  else if (output.isView) {
    node = output.toDom(document);
  }
  else {
    if (this.command.returnType === 'terminal') {
      if (Array.isArray(output)) {
        node = util.createElement(document, 'div');
        output.forEach(function() {
          var child = util.createElement(document, 'textarea');
          child.classList.add('gcli-row-subterminal');
          child.readOnly = true;

          node.appendChild(child);
        });
      }
      else {
        node = util.createElement(document, 'textarea');
        node.classList.add('gcli-row-terminal');
        node.readOnly = true;
      }
    }
    else {
      node = util.createElement(document, 'p');
    }

    util.setContents(node, output.toString());
  }

  // Make sure that links open in a new window.
  var links = node.querySelectorAll('*[href]');
  for (var i = 0; i < links.length; i++) {
    links[i].setAttribute('target', '_blank');
  }

  element.appendChild(node);
};

/**
 * Convert this object to a string so GCLI can be used in traditional character
 * based terminals.
 */
Output.prototype.toString = function(document) {
  var output = this.data;
  if (output == null) {
    return '';
  }

  if (typeof HTMLElement !== 'undefined' && output instanceof HTMLElement) {
    return output.textContent;
  }

  if (output.isView) {
    return output.toDom(document).textContent;
  }

  return output.toString();
};

exports.Output = Output;

/**
 * Functions and data related to the execution of a command
 */
exports.createExecutionContext = function(requisition) {
  return {
    exec: requisition.exec.bind(requisition),
    update: requisition.update.bind(requisition),
    document: requisition.document,
    environment: requisition.environment,
    createView: view.createView,
    createPromise: function() {
      return new Promise();
    }
  };
};


});
