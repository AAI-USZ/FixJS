function test (type, rtn, ffi) {
  //console.log('Input:\t%s', type)
  var parsed = types.parse(type)
  //console.log('Output:\t'+inspect(parsed, true, 10, true)+'\n')
  assert.deepEqual(parsed, rtn)
  if (!ffi) return
  var f = types.mapArray(parsed)
  //console.log('FFI Types:\t'+inspect(f, true, 10, true)+'\n')
  assert.deepEqual(f, ffi)
}