function cb (obj1, obj2, context) {
  callbackCount++
  var n1 = b.class_getName(obj1)
    , n2 = b.class_getName(obj2)
  if (n1 == n2) return 0
  return n1 > n2 ? 1 : -1
}