function (writer) {
  writer.enter("class " + this + " {");
  traceArray(writer, "traits", this.traits);
  writer.leave("}");
}