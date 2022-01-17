function (writer) {
  writer.enter("instance " + this + " {");
  traceArray(writer, "traits", this.traits);
  writer.leave("}");
}