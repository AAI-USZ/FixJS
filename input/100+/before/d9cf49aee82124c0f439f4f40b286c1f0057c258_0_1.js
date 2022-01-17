function getTypes (method) {
  if (!method) throw new Error('bad pointer!')
  var args = []
    , types = []
    , numArgs = b.method_getNumberOfArguments(method)
    , rtnTypePtr = b.method_copyReturnType(method)
    , rtnType = rtnTypePtr.readCString()
  b.free(rtnTypePtr)
  types.push(rtnType)
  types.push(args)
  for (var i=0; i<numArgs; i++) {
    var argPtr = b.method_copyArgumentType(method, i)
    args.push(argPtr.readCString())
    b.free(argPtr)
  }
  //console.log(types)
  return types
}