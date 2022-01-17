function(value, callback) {
  if (isPending(value))
    watch(value, callback)
  else
    callback(value)
}