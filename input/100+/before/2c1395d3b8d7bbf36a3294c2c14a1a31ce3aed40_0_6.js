function Model(bin) {
  var stream = new ReadStream(bind);
  this.source = bin;

  this.signature = stream.read_signature();
  assert(signature_map.hasOwnProperty(this.signature));
  this.schema = signature_map[this.signature];

  if(this.schema instanceof Array) {
    this.value = [];
    this.schema.forEach(function(v) {
      this.value.push(read_element(stream, v));
    });
  } else { this.value = read_element(stream, v); }

  assert(stream.is_eof());
}