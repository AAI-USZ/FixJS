function merge (to, from) {
  to = to || {}
  for (var k in from)
    if('undefined' === typeof to[k])
      to[k] = from[k]
  return to
}