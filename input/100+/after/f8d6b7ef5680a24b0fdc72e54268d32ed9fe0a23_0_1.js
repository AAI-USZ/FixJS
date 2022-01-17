function getStruct (type) {
  // First check if a regular name was passed in
  var rtn = structs[type]
  if (rtn) {
    debug('returning cached Struct for given name:', name)
    return rtn
  }
  // If the struct type name has already been created, return that one
  var name = exports.parseStructName(type)
  //console.error('name: %s', name)
  rtn = structs[name]
  if (rtn) {
    debug('returning cached Struct for type:', type)
    debug('                     parsed name:', name)
    return rtn
  }
  // Next parse the type structure
  var parsed = exports.parseStruct(type)
  // Otherwise we need to create a new Struct constructor
  var struct = Struct()
  parsed.props.forEach(function (prop) {
    struct.defineProperty(prop[0], types.map(prop[1]))
  })
  debug('finished defining Struct', parsed.name, struct)
  return structs[parsed.name] = struct
}