function Bitfield(values, source, extended){
    return Proxy.create(new BitfieldHandler(values, source, extended), Bitfield.prototype);
  }