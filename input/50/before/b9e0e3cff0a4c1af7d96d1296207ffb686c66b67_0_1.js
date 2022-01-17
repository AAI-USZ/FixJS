function alloc () {
  var ptr = ref.alloc('pointer', ref.NULL)
  ptr._type = '@'
  return ptr
}