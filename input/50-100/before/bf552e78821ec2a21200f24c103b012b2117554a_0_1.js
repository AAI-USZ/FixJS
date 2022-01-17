function addIvar (name, type, size, alignment) {
  if (!size) {
    // lookup the size of the type when needed
    var ffiType = types.map(type)
    size = core.TYPE_SIZE_MAP[ffiType]
  }
  if (!alignment) {
    // also set the alignment when needed. This formula is from Apple's docs:
    //   For variables of any pointer type, pass log2(sizeof(pointer_type)).
    alignment = Math.log(size) / Math.log(2)
  }
  if (!core.class_addIvar(this, name, size, alignment, type)) {
    throw new Error('ivar "' + name + '" was NOT sucessfully added to Class: ' + this.getName())
  }
  return this
}