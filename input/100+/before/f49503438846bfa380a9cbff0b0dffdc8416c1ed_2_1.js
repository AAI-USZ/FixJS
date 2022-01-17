function trace(writer, abc) {
  writer.enter("method" + (this.name ? " " + this.name : "") + " {");
  writer.writeLn("flags: " + getFlags(this.flags, "NEED_ARGUMENTS|NEED_ACTIVATION|NEED_REST|HAS_OPTIONAL||NATIVE|SET_DXN|HAS_PARAM_NAMES".split("|")));

  if (!this.code) {
    writer.leave("}");
    return;
  }

  var code = new AbcStream(this.code);

  this.traits.trace(writer);

  writer.enter("code {");
  while (code.remaining() > 0) {
    var bc = code.readU8();
    var opcode = opcodeTable[bc];
    var str, defaultOffset, offset, count;
    str = ("" + code.position).padRight(' ', 6);
    switch (bc) {
      case OP_lookupswitch:
        str += opcode.name + ": defaultOffset: " + code.readS24();
        var caseCount = code.readU30();
        str += ", caseCount: " + caseCount;
        for (var i = 0; i < caseCount + 1; i++) {
          str += " offset: " + code.readS24();
        }
        writer.writeLn(str);
        break;
      default:
        if (opcode) {
          str += opcode.name.padRight(' ', 20);
          if (!opcode.operands) {
            assert(false, "Opcode: " + opcode.name + " has undefined operands.");
          } else {
            if (opcode.operands.length > 0) {
              str += traceOperands(opcode, abc, code);
            }
            writer.writeLn(str);
          }
        } else {
          assert(false, "Opcode: " + bc + " is not implemented.");
        }
        break;
    }
  }
  writer.leave("}");
  writer.leave("}}
