function cb (obj1, obj2, context) {
  callbackCount++
  var n1 = b.class_getName(obj1)
    , n2 = b.class_getName(obj2)
  return n1 > n2 ? 1 : 0
}