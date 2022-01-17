function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  arguments.callee = arguments.callee.caller;
  if (this.console) {
    console.log( Array.prototype.slice.call(arguments) );
  }
}