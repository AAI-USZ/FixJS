function (writer) {
  writer.enter("script " + this + " {");
  this.traits.trace(writer);
  writer.leave("}");
}