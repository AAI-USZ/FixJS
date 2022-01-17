function(camel, id){
  if (this.hasOwn.call(this.identifiers, camel) && this.identifiers[camel] !== id) {
    throw new ReferenceError("Inconsistent use of " + camel + " as " + id + " on line " + (-~this.line));
  } else {
    return this.identifiers[camel] = id;
  }
}