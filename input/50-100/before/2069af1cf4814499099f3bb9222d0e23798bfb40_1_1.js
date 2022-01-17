function(arg) {
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
}