function(value, result) {
  // TODO: Attempt to deliver as side effect of
  // dispatch will change a value 
  if (isPending(value)) {
    value[valueOf] = result
    var listeners = watchers(value)
    while (listeners.length)
      await(result, listeners.shift())
    value[pending] = false
  }

  return value
}