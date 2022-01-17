function (writer) {
  writer.enter("script " + this + " {");
  traceArray(writer, "traits", this.traits);
  writer.leave("}");
}