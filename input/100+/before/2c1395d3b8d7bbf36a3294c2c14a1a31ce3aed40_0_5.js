function read_element(stream, schema) {
  var ret;
  switch(schema.type) {
    case 'integer':
    ret = stream.read_ber();
    break;

    case 'string':
    ret = stream.read_string(stream.length);
    break;

    case 'bool':
    ret = stream.read_ber();
    assert(ret === 0 || ret === 1);
    ret = ret? true : false;
    break;

    case 'binary':
    ret = stream.slice(stream.length);
    break;

    case 'event':
    ret = new Event(stream);
    break;

    case 'ber_enum':
    ret = [];
    var ber_enum_size = stream.read_ber(s);
    for(var i = 0; i <= ber_enum_size; ++i) {
      ret.push(stream.read_ber());
    }

    case 'array1d':
    ret = new Array1D(schema);
    ret.load_stream(stream);
    break;

    case 'array2d':
    ret = new Array2D(schema);
    ret.load_stream(stream);
    break;

    default:
    assert(schema_map.hasOwnProperty(schema.type));
    return read_element(stream, schema_map[schema.type]);
  }
  assert(stream.is_eof());
  return ret;
}