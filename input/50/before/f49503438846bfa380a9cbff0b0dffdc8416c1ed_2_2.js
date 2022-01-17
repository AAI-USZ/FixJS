function (writer) {
  writer.enter("instance " + this + " {");
  this.traits.trace(writer);
  writer.leave("}");
}